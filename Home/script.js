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
