// Loader (3s + onload)
(function(){
  const overlay = document.getElementById('loader');
  if(!overlay) return;
  const MIN_SHOW_MS = 3000;
  let minTimerDone = false, pageReady = false;

  document.body.classList.add('is-loading');
  function hide(){ overlay.classList.add('is-done'); document.body.classList.remove('is-loading'); setTimeout(()=>overlay.style.display='none',450); }
  function tryFinish(){ if(minTimerDone && pageReady) hide(); }

  setTimeout(()=>{ minTimerDone = true; tryFinish(); }, MIN_SHOW_MS);
  if (document.readyState === 'complete'){ pageReady = true; tryFinish(); }
  else { window.addEventListener('load', ()=>{ pageReady = true; tryFinish(); }); }

  // hard cap
  setTimeout(()=>{ if(!overlay.classList.contains('is-done')) hide(); }, 6000);
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


// Tabs (your original, kept)
(function(){
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  if(!tabs.length) return;

  function activate(tab){
    tabs.forEach(t=>{ t.setAttribute('aria-selected','false'); t.tabIndex = -1; });
    panels.forEach(p=> p.hidden = true);
    tab.setAttribute('aria-selected','true'); tab.tabIndex = 0;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
  }
  tabs.forEach(tab=> tab.addEventListener('click', ()=>activate(tab)));
  const keyMap = {ArrowUp:-1, ArrowLeft:-1, ArrowDown:1, ArrowRight:1};
  const list = document.querySelector('.tablist');
  if(list){
    list.addEventListener('keydown', (e)=>{
      if(!(e.key in keyMap || e.key==='Home' || e.key==='End')) return;
      e.preventDefault();
      const arr = Array.from(tabs);
      let idx = arr.indexOf(document.activeElement);
      if(e.key==='Home') idx = 0;
      else if(e.key==='End') idx = arr.length-1;
      else idx = (idx + keyMap[e.key] + arr.length) % arr.length;
      arr[idx].focus(); activate(arr[idx]);
    });
  }
  activate(document.querySelector('[role="tab"]'));
})();

// Scroll reveal (full-width sections)
(function(){
  const boxes = document.querySelectorAll('.reveal-box');
  if(!boxes.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  boxes.forEach(b=> io.observe(b));
})();


function updateCountdown() {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);

        const diff = newYearDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();