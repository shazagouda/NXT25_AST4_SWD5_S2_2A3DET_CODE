
const A3 = (() => {

  function initNavbarScroll() {
    const navbar = document.getElementById('siteNavbar');
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.classList.toggle('is-active', isOpen);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initActiveLink() {
    const path = window.location.pathname.toLowerCase();
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href && path.endsWith(href) && href !== '/') {
        link.classList.add('is-active');
      }
    });
  }

  function initRevealAnimations() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
      observer.observe(el);
    });
  }

  function animateCounter(el, target, suffix = '', duration = 1400) {
    const start = 0;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); 
      const value = Math.floor(start + (target - start) * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters(selector = '[data-counter]') {
    const counters = document.querySelectorAll(selector);
    if (!counters.length || !('IntersectionObserver' in window)) {
      counters.forEach(el => {
        const target = parseInt(el.dataset.counter, 10) || 0;
        const suffix = el.dataset.suffix || '';
        el.textContent = target.toLocaleString() + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10) || 0;
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  function initFillBars(selector = '[data-fill]') {
    const bars = document.querySelectorAll(selector);
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(bar => bar.style.width = `${bar.dataset.fill}%`);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.fill}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
  }

    function initNotifications() {
      document.querySelectorAll('.nav-icon-btn[data-notif]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          btn.classList.toggle('is-open');
        });
      });
    }
  
    function initThemeToggle() {
      const btn = document.getElementById('themeToggleBtn');

      // Apply saved theme immediately on every page load
      const saved = localStorage.getItem('a3det-theme') || 'light';
      document.documentElement.setAttribute('data-theme', saved);

      if (!btn) return;

      // Use Bootstrap Icons instead of emojis
      function updateIcon(theme) {
        const icon = btn.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
        } else {
          icon.className = 'bi bi-moon-stars-fill';
        }
      }

      updateIcon(saved);

      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('a3det-theme', next);
        updateIcon(next);
      });
    }
  
    function init() {
      initNavbarScroll();
      initMobileMenu();
      initActiveLink();
      initRevealAnimations();
      initCounters();
      initFillBars();
      initNotifications();
      initThemeToggle();
    }

  return { init, animateCounter, initCounters, initFillBars, initRevealAnimations };
})();

document.addEventListener('DOMContentLoaded', A3.init);
