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


// Mobile hamburger toggle
 const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // Update accessibility attribute
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
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
(function () {
  const lastUpdated = document.lastModified; // Get last modified date
  const lastUpdatedElement = document.getElementById("last-updated"); // The span where we want to show the date
  
  if (lastUpdatedElement) {
    // Format the date into a readable format
    const formattedDate = new Date(lastUpdated).toLocaleDateString();
    
    // Set the last updated date inside the span
    lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
  }
})();
