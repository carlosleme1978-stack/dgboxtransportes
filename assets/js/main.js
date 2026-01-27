(function(){
  const toggle = document.querySelector('[data-mobile-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  if(toggle && drawer){
    toggle.addEventListener('click', ()=>{
      const open = drawer.getAttribute('data-open') === 'true';
      drawer.setAttribute('data-open', open ? 'false' : 'true');
      drawer.style.display = open ? 'none' : 'block';
    });
  }
})();

/* --- Slider (Hero) + Scroll Reveal --- */
(function(){
  // Slider
  const root = document.querySelector('[data-slider]');
  if(root){
    const slidesEl = root.querySelector('[data-slides]');
    const slides = Array.from(root.querySelectorAll('.hero-slide'));
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const dotsEl = root.querySelector('[data-dots]');
    let index = 0;
    let timer = null;
    let isHover = false;

    function go(i){
      index = (i + slides.length) % slides.length;
      slidesEl.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((s, k)=> s.classList.toggle('is-active', k === index));
      if(dotsEl){
        Array.from(dotsEl.children).forEach((d,k)=> d.setAttribute('aria-selected', String(k===index)));
      }
    }

    function start(){
      stop();
      timer = window.setInterval(()=>{ if(!isHover) go(index + 1); }, 5200);
    }
    function stop(){
      if(timer) window.clearInterval(timer);
      timer = null;
    }

    // dots
    if(dotsEl){
      slides.forEach((_,k)=>{
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'slider-dot';
        b.setAttribute('role','tab');
        b.setAttribute('aria-label', `Ir para o slide ${k+1}`);
        b.setAttribute('aria-selected', String(k===0));
        b.addEventListener('click', ()=>{ go(k); start(); });
        dotsEl.appendChild(b);
      });
    }

    prev && prev.addEventListener('click', ()=>{ go(index-1); start(); });
    next && next.addEventListener('click', ()=>{ go(index+1); start(); });

    // hover pause
    root.addEventListener('mouseenter', ()=>{ isHover = true; });
    root.addEventListener('mouseleave', ()=>{ isHover = false; });

    // swipe (mobile)
    let x0 = null;
    root.addEventListener('touchstart', (e)=>{ x0 = e.touches[0].clientX; }, {passive:true});
    root.addEventListener('touchend', (e)=>{
      if(x0 === null) return;
      const x1 = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : x0;
      const dx = x1 - x0;
      if(Math.abs(dx) > 36){
        go(index + (dx < 0 ? 1 : -1));
        start();
      }
      x0 = null;
    });

    go(0);
    start();

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden) stop(); else start();
    });
  }

  // Scroll reveal: aplica automaticamente em elementos chave
  const targets = document.querySelectorAll('.hero-card, .section .card, .feature, .faq-item, .areas a, .testi, .pricing, .cta, .grid > *');
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -10% 0px'});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
