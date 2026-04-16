document.addEventListener('DOMContentLoaded', () => {
  const drawerBtn = document.querySelector('[data-mobile-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  if (drawerBtn && drawer) {
    drawerBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
  }

  document.querySelectorAll('.slider').forEach((slider) => {
    const slidesWrap = slider.querySelector('.slides');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    const dotsWrap = slider.querySelector('.slider-dots');
    if (!slidesWrap || slides.length <= 1) return;
    let index = 0;
    const go = (n) => {
      index = (n + slides.length) % slides.length;
      slidesWrap.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((dot, i) => dot.setAttribute('aria-selected', i === index ? 'true' : 'false'));
      }
    };
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => go(i));
        dotsWrap.appendChild(dot);
      });
    }
    prev?.addEventListener('click', () => go(index - 1));
    next?.addEventListener('click', () => go(index + 1));
    setInterval(() => go(index + 1), 4800);
    go(0);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});
