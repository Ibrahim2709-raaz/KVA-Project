const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

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

document.querySelectorAll('.reveal, .reveal-box').forEach((element) => {
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
  }, { threshold: 0.15 });

  observer.observe(element);
});

(() => {
  const slider = document.querySelector('.sponsors-slider');
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll('.ss-card'));
  const dotsWrap = slider.querySelector('.ss-dots');
  const interval = Number(slider.dataset.interval || 4500);
  let index = 0;
  let timer;

  cards.forEach((card, cardIndex) => {
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
    if (slider.dataset.autoplay === 'true' && !reducedMotion.matches) {
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
})();

const year = document.getElementById('copyright-year');
const updated = document.getElementById('last-updated');

if (year) year.textContent = String(new Date().getFullYear());
if (updated) {
  updated.textContent = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(document.lastModified));
}
