// **************
// Loader Display
// **************
(function () {
  const overlay = document.getElementById("loader");
  if (!overlay) return;

  const MIN_SHOW_MS = 3000;
  let minTimerDone = false;
  let pageReady = false;

  document.body.classList.add("is-loading");

  function hideLoader() {
    overlay.classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(() => (overlay.style.display = "none"), 450);
  }

  function tryFinish() {
    if (minTimerDone && pageReady) hideLoader();
  }

  // minimum time loader stays visible
  setTimeout(() => {
    minTimerDone = true;
    tryFinish();
  }, MIN_SHOW_MS);

  // detect when page fully loads
  if (document.readyState === "complete") {
    pageReady = true;
    tryFinish();
  } else {
    window.addEventListener("load", () => {
      pageReady = true;
      tryFinish();
    });
  }

  // safety timeout (force hide)
  setTimeout(() => {
    if (!overlay.classList.contains("is-done")) hideLoader();
  }, 6000);
})();


// ***************************
// Mobile Hamburger Menu Toggle
// ***************************
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.innerHTML = expanded ? "&#9776;" : "&#10005;";
  });
});


// ***************************
// Scroll Reveal for Sections
// ***************************
(function () {
  const revealElements = document.querySelectorAll(".reveal, .reveal-box");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        // Animating when entering viewport
        if (entry.isIntersecting) {
          entry.target.classList.add("in", "in-view");

          // Remove animation class after animation finishes
          setTimeout(() => {
            entry.target.classList.remove("in");
          }, 600);
        }
        else {
          // resetting"in-view" when leaving viewport
          entry.target.classList.remove("in-view");
        }

      });
    },
    { threshold: 0.25 }
  );

  revealElements.forEach((el) => observer.observe(el));
})();