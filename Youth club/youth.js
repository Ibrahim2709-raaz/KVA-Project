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

// Hamburger
document.addEventListener('DOMContentLoaded', ()=>{
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('active');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menuToggle.innerHTML = expanded ? '&#9776;' : '&#10005;';
    });
  }
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
