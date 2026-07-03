/* =========================================================
   ECOFLOW ENERGY — Shared Site Script
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---- Highlight active nav link based on current page ---- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll-reveal animation ---- */
  const revealEls = document.querySelectorAll('.reveal, .service-block');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        countIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ---- Contact form (front-end only demo) ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    const msg = document.getElementById('form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        msg.textContent = 'Please fill in every field before sending.';
        msg.className = 'form-msg show';
        msg.style.background = 'rgba(220,38,38,0.08)';
        msg.style.color = '#B91C1C';
        msg.style.border = '1px solid rgba(220,38,38,0.25)';
        return;
      }

      msg.textContent = `Thanks, ${name.split(' ')[0]} — your message has been queued to send to Ecoflow Energy. We'll reply to ${email} shortly.`;
      msg.className = 'form-msg show success';
      msg.style.background = '';
      msg.style.color = '';
      msg.style.border = '';
      form.reset();
    });
  }

});
