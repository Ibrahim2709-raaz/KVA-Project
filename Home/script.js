// Reveal-on-view (progressive enhancement)
(() => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    const els = hero.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        els.forEach(el => io.observe(el));
    } else {
        els.forEach(el => el.classList.add('in'));
    }
})();

// Button mini “component” behavior
document.addEventListener('click', (e) => {
    const join = e.target.closest('#joinBtn');
    if (!join) return;
    e.preventDefault();
    join.setAttribute('aria-busy', 'true');
    setTimeout(() => {
        join.removeAttribute('aria-busy');
        join.dataset.variant = 'success';
        join.textContent = 'Joined!';
    }, 900);
});


// Mobile hamburger toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));

        // Change icon between ☰ and ✕
        menuToggle.innerHTML = expanded ? '&#9776;' : '&#10005;';
    });
});



(function(){
  const slider = document.querySelector('.sponsors-slider');
  if(!slider) return;

  const track = slider.querySelector('.ss-track');
  const cards = Array.from(track.querySelectorAll('.ss-card'));
  const dotsWrap = slider.querySelector('.ss-dots');
  let index = 0;

  const autoplay = slider.dataset.autoplay === 'true';
  const interval = Number(slider.dataset.interval || 3000);
  let timer = null;

  // build dots
  dotsWrap.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  // layout function
  function layout(){
    const center = index;
    const gap = Math.min(280, Math.max(180, window.innerWidth * 0.15));
    const depth = 120;
    const tilt = 12;

    cards.forEach((card, i) => {
      // wrap index positions infinitely
      const total = cards.length;
      const rel = ((i - center + total) % total);
      let offset = rel;
      if (offset > total / 2) offset -= total; // symmetrical offset -2..2 etc

      const visible = Math.abs(offset) <= 1;

      // position logic
      let tx = offset * gap;
      let tz = offset === 0 ? 40 : -Math.abs(offset) * depth;
      let ry = offset * -tilt;
      let sc = offset === 0 ? 1 : 0.88;
      const z = offset === 0 ? 50 : 40 - Math.abs(offset);

      // apply transforms
      card.style.opacity = visible ? 1 : 0;
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.style.zIndex = z;
      card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
      card.style.transition = 'transform .7s ease, opacity .5s ease';
    });

    dots.forEach((d,i)=>d.setAttribute('aria-selected', String(i===index)));
  }

  // looping navigation
  function go(i){
    index = (i + cards.length) % cards.length;
    layout();
    restart();
  }

  function nextSlide(){
    index = (index + 1) % cards.length;
    layout();
  }

  function start(){
    if(!autoplay) return;
    stop();
    timer = setInterval(nextSlide, interval);
  }

  function stop(){
    if(timer){ clearInterval(timer); timer = null; }
  }

  function restart(){
    stop(); start();
  }

  // Pause on hover
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // Init
  layout();
  start();
  window.addEventListener('resize', layout);
})();

// --------- KVA Modal (popup every visit) ----------
(function () {
  const overlay  = document.getElementById('siteModal');
  if (!overlay) return;

  const modal    = overlay.querySelector('.modal');
  const closeBtn = document.getElementById('modalClose');
  const cta      = document.getElementById('modalCTA');

  function openModal() {
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => (cta?.focus() || closeBtn?.focus() || modal?.focus()), 10);
  }

  function closeModal() {
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // close on Esc or click outside
  function onKey(e) { if (e.key === 'Escape') closeModal(); }
  function onOverlayClick(e) { if (!modal.contains(e.target)) closeModal(); }

  closeBtn?.addEventListener('click', closeModal);
  cta?.addEventListener('click', closeModal);
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKey);

  // show immediately after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    openModal();
  });

  // optional helpers for dev console
  window.kvaShowNow = () => openModal();
})();
// ---------- Loader control ----------
(function(){
  const overlay = document.getElementById('loader');
  if (!overlay) return;

  const MIN_SHOW_MS = 3000; // keep loader visible ~3s
  let minTimerDone = false;
  let pageReady = false;

  // Prevent scroll while overlay is visible
  document.body.classList.add('is-loading');

  // Helper: hide overlay
  function hideLoader(){
    overlay.classList.add('is-done');
    document.body.classList.remove('is-loading');
    // fully remove from tree after fade
    setTimeout(() => { overlay.style.display = 'none'; }, 450);
  }

  function tryFinish(){
    if (minTimerDone && pageReady){
      hideLoader();
    }
  }

  // Wait at least MIN_SHOW_MS
  setTimeout(() => { minTimerDone = true; tryFinish(); }, MIN_SHOW_MS);

  // When page is fully loaded (images, CSS, etc.)
  if (document.readyState === 'complete'){
    pageReady = true; tryFinish();
  } else {
    window.addEventListener('load', () => { pageReady = true; tryFinish(); });
  }

  // Safety: if something blocks 'load', still hide after a hard cap (e.g., 6s)
  setTimeout(() => {
    if (!overlay.classList.contains('is-done')){
      hideLoader();
    }
  }, 6000);

  // Optional: allow closing on Esc or click (useful for development)
  function devClose(e){
    if (e.key === 'Escape'){
      hideLoader();
      window.removeEventListener('keydown', devClose);
    }
  }
  window.addEventListener('keydown', devClose);
  overlay.addEventListener('click', hideLoader);
})();


// -------- Scroll Reveal for Box Sections --------
(function(){
  const boxes = document.querySelectorAll('.reveal-box');
  if(!boxes.length) return;

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // once animated, you can unobserve to avoid repeat
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  boxes.forEach(b=>observer.observe(b));
})();

// Get the last modified date of the document
const lastModified = document.lastModified;

// Put it inside the footer span
document.getElementById("lastUpdated").textContent = lastModified;
