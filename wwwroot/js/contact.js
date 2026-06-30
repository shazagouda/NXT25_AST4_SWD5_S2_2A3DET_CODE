
(function () {
    'use strict';

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const submitBtn = form.querySelector('.btn-submit');
        const successMsg = document.getElementById('successMessage');

        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });
            input.addEventListener('input', function () {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) return;

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                successMsg.classList.add('show');
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });

                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }, 2000);
        });
    }

    function validateField(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;

        input.classList.remove('is-valid', 'is-invalid');

        if (input.hasAttribute('required') && !value) {
            isValid = false;
        }

        if (id === 'Email' && value && !isValidEmail(value)) {
            isValid = false;
        }

        if (id === 'FullName' && value && value.length < 2) {
            isValid = false;
        }

        if (id === 'Message' && value && value.length < 10) {
            isValid = false;
        }

        if (isValid && value) {
            input.classList.add('is-valid');
        } else if (!isValid) {
            input.classList.add('is-invalid');
        }

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function initFaq() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function () {
                const isOpen = item.classList.contains('is-open');

                items.forEach(i => i.classList.remove('is-open'));
                if (!isOpen) {
                    item.classList.add('is-open');
                }
            });
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
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

    function initReveal() {
        const elements = document.querySelectorAll('.contact-info-card, .faq-item');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    function initCharCounter() {
        const textarea = document.getElementById('Message');
        if (!textarea) return;

        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'font-size:var(--fs-xs);color:var(--color-text-400);text-align:right;margin-top:var(--space-1);';
        textarea.parentNode.appendChild(counter);

        textarea.addEventListener('input', function () {
            const count = this.value.length;
            const max = this.maxLength || 1000;
            counter.textContent = `${count}/${max}`;
            if (count > max) {
                counter.style.color = 'var(--color-danger)';
            } else {
                counter.style.color = 'var(--color-text-400)';
            }
        });
    }


    function init() {
        initContactForm();
        initFaq();
        initSmoothScroll();
        initReveal();
        initCharCounter();

        console.log('%c 📬 Contact page loaded! ', 'background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();