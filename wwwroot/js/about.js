
(function () {
    'use strict';

    function initCounters() {
        const counters = document.querySelectorAll('.stat-value[data-counter]');
        if (!counters.length) return;

        const options = { threshold: 0.5, rootMargin: '0px 0px -40px 0px' };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.counter, 10);
                    const suffix = el.dataset.suffix || '';
                    let current = 0;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let step = 0;

                    const timer = setInterval(() => {
                        step++;
                        current += increment;
                        if (step >= steps) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current).toLocaleString() + suffix;
                    }, duration / steps);

                    observer.unobserve(el);
                }
            });
        }, options);

        counters.forEach(c => observer.observe(c));
    }

    function initProgressBars() {
        const bars = document.querySelectorAll('.progress-fill');
        if (!bars.length) return;

        const options = { threshold: 0.3 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.progress || '0%';
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });
        }, options);

        bars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }

    function initRevealCards() {
        const cards = document.querySelectorAll('.gap-card, .pillar-card-modern, .role-card-modern, .stage-card');
        if (!cards.length) return;

        const options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.unobserve(el);
                }
            });
        }, options);

        cards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    function initParallax() {
        const hero = document.querySelector('.about-hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = `${rate}px`;
        }, { passive: true });
    }
    function init() {

        requestAnimationFrame(() => {
            initCounters();
            initProgressBars();
            initRevealCards();
            initSmoothScroll();
            initNavbar();
            initParallax();
        });

        console.log('%c 🚀 About page loaded successfully! ', 'background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();