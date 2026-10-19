(() => {
  // ヘッダー：スクロールで背景を付ける
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // スマホ用メニュー
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    navList.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navList.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // 言語切替：外側をクリック / Esc で閉じる
  const langMenu = document.querySelector('.lang-switch details');
  if (langMenu) {
    document.addEventListener('click', (e) => { if (!langMenu.contains(e.target)) langMenu.open = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') langMenu.open = false; });
  }

  // ヒーロー：スライドショー
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;
  if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 6000);
  }

  // スクロールでふわっと表示
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ライトボックス
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const images = [...document.querySelectorAll('[data-lightbox]')];
  let idx = 0;
  const show = (i) => {
    idx = (i + images.length) % images.length;
    lbImg.src = images[idx].src;
    lbImg.alt = images[idx].alt;
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; };
  images.forEach((img, i) => img.addEventListener('click', () => {
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }));
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
