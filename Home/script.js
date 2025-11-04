(() => {
  // Run after DOM is ready
  const ready = (fn) =>
    (document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn());

  ready(() => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // -------- Reveal on load (safe for old browsers) --------
    const enter = (el) => el.classList.add('in');

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            enter(hero);
            io.disconnect();
            break;
          }
        }
      }, { threshold: 0.25 });
      io.observe(hero);
    } else {
      // Fallback
      enter(hero);
    }

    // -------- Micro-parallax (with motion safety + rAF throttle) --------
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      hero.classList.add('parallax');

      const text = hero.querySelector('.hero-text');
      const imgCard = hero.querySelector('.hero-image');
      const blobs = hero.querySelectorAll('.blob');

      let w = window.innerWidth, h = window.innerHeight;
      const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

      let raf = null, lastX = w / 2, lastY = h / 2;

      const apply = () => {
        const nx = (lastX / w) * 2 - 1; // [-1, 1]
        const ny = (lastY / h) * 2 - 1;

        const tImg = `translate(${clamp(nx * 6, -8, 8)}px, ${clamp(ny * 4, -6, 6)}px)`;
        const tTxt = `translate(${clamp(nx * 3, -5, 5)}px, ${clamp(ny * 2, -4, 4)}px)`;

        if (imgCard) imgCard.style.transform = tImg;
        if (text) text.style.transform = tTxt;

        blobs.forEach((b, i) => {
          const mult = (i + 1) * 2;
          b.style.transform = `translate(${clamp(nx * mult, -16, 16)}px, ${clamp(ny * mult, -14, 14)}px)`;
        });

        raf = null;
      };

      const onMove = (e) => {
        const p = ('touches' in e) ? e.touches[0] : e;
        lastX = p.clientX; lastY = p.clientY;
        if (!raf) raf = requestAnimationFrame(apply);
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('resize', () => { w = innerWidth; h = innerHeight; }, { passive: true });
    }
  });
})();

