document.documentElement.classList.add('js');

const menuToggle = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  };

  menuToggle.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.reveal').forEach((element) => {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    element.classList.add('in-view');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  observer.observe(element);
});

document.querySelectorAll('[data-sponsors]').forEach((slider) => {
  const cards = Array.from(slider.querySelectorAll('.ss-card'));
  const dotsWrap = slider.querySelector('.ss-dots');
  if (!cards.length || !dotsWrap) return;

  let index = 0;
  let timer;
  const interval = Number(slider.dataset.interval || 4500);

  cards.forEach((_, cardIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show sponsor ${cardIndex + 1}`);
    dot.addEventListener('click', () => show(cardIndex));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function render() {
    cards.forEach((card, cardIndex) => {
      const active = cardIndex === index;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-selected', String(dotIndex === index));
      dot.tabIndex = dotIndex === index ? 0 : -1;
    });
  }

  function stop() {
    window.clearInterval(timer);
  }

  function start() {
    stop();
    if (!reducedMotion.matches) {
      timer = window.setInterval(() => show((index + 1) % cards.length, false), interval);
    }
  }

  function show(nextIndex, restart = true) {
    index = (nextIndex + cards.length) % cards.length;
    render();
    if (restart) start();
  }

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  reducedMotion.addEventListener?.('change', start);
  render();
  start();
});

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  const requestedTopic = new URLSearchParams(window.location.search).get('topic');
  const topicSelect = form.elements.topic;
  if (requestedTopic && topicSelect) {
    const match = Array.from(topicSelect.options).find((option) => option.value.toLowerCase() === requestedTopic.toLowerCase());
    if (match) topicSelect.value = match.value;
  }

  const fields = ['name', 'email', 'message'];

  const validate = (field) => {
    const wrapper = field.closest('.form-field');
    const error = wrapper?.querySelector('.form-error');
    let message = '';

    if (!field.validity.valid) {
      if (field.validity.valueMissing) message = 'This field is required.';
      else if (field.validity.typeMismatch) message = 'Enter a valid email address.';
      else if (field.validity.tooShort) message = `Use at least ${field.minLength} characters.`;
      else message = 'Check this field and try again.';
    }

    wrapper?.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message;
    return !message;
  };

  fields.forEach((name) => {
    const field = form.elements[name];
    field?.addEventListener('blur', () => validate(field));
    field?.addEventListener('input', () => {
      if (field.closest('.form-field')?.classList.contains('has-error')) validate(field);
    });
  });

  form.addEventListener('submit', (event) => {
    const valid = fields.every((name) => validate(form.elements[name]));
    if (!valid) event.preventDefault();
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
