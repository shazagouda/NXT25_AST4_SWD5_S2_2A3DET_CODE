/* ================================================================
   MENTORS.JS — سكريبت متطور لصفحات المينتورز
   يشمل: عدادات متحركة، فلترة، حجز، تفاعلات UI
   ================================================================ */

(function () {
    'use strict';

    /* ============================================================
       DOM HELPERS
       ============================================================ */
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    /* ============================================================
       ANIMATED COUNTERS
       ============================================================ */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-counter]');
        if (!counters.length) return;

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
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    /* ============================================================
       FILTER FORM - Auto Submit
       ============================================================ */
    function initFilters() {
        const form = document.getElementById('filterForm');
        if (!form) return;

        const selects = form.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', () => form.submit());
        });

        const searchInput = form.querySelector('input[name="search"]');
        if (searchInput) {
            let timeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => form.submit(), 500);
            });
        }
    }

    /* ============================================================
       MENTOR CARD - Hover Effects
       ============================================================ */
    function initCardHover() {
        const cards = $$('.mentor-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                const avatar = this.querySelector('.mentor-avatar');
                if (avatar) {
                    avatar.style.transform = 'scale(1.08)';
                }
            });

            card.addEventListener('mouseleave', function () {
                const avatar = this.querySelector('.mentor-avatar');
                if (avatar) {
                    avatar.style.transform = 'scale(1)';
                }
            });
        });
    }

    /* ============================================================
       BOOKING MODAL
       ============================================================ */
    function initBookingModal() {
        const modal = document.getElementById('bookModal');
        if (!modal) return;

        const openButtons = $$('[data-open-modal]');
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal;

        // Open modal
        openButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const mentorId = this.dataset.mentorId;
                const mentorName = this.dataset.mentorName;

                // Set mentor data in modal
                const nameEl = modal.querySelector('#modalMentorName');
                const idEl = modal.querySelector('#modalMentorId');
                if (nameEl) nameEl.textContent = mentorName;
                if (idEl) idEl.value = mentorId;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    /* ============================================================
       BOOKING FORM
       ============================================================ */
    function initBookingForm() {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '⏳ Submitting...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success
            showNotification('✅ Session booked successfully!', 'success');

            submitBtn.textContent = '✅ Booked!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                this.reset();

                // Close modal
                const modal = document.getElementById('bookModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 1500);
        });
    }

    /* ============================================================
       NOTIFICATION SYSTEM
       ============================================================ */
    function showNotification(message, type = 'info') {
        const colors = {
            info: '#2F6FED',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#E14F4F'
        };

        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };

        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            top: calc(var(--navbar-height, 76px) + 20px);
            right: 20px;
            background: ${colors[type] || colors.info};
            color: #fff;
            padding: 14px 24px;
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            transform: translateX(120%);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
            z-index: 9999;
            max-width: 420px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.1);
        `;

        notification.innerHTML = `
            <span style="font-size:20px;">${icons[type] || 'ℹ️'}</span>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Enter
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });

        // Auto dismiss
        const timeout = setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 4500);

        // Click to dismiss
        notification.addEventListener('click', () => {
            clearTimeout(timeout);
            notification.style.transform = 'translateX(120%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        });
    }

    /* ============================================================
       KEYBOARD SHORTCUTS
       ============================================================ */
    function initShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+F - Focus search
            if (e.ctrlKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-box input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }

            // Escape - Close modal
            if (e.key === 'Escape') {
                const modal = document.getElementById('bookModal');
                if (modal && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    /* ============================================================
       SMOOTH SCROLL FOR "BROWSE MENTORS" LINK
       ============================================================ */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    /* ============================================================
       LOADING STATE FOR PAGINATION
       ============================================================ */
    function initPagination() {
        const paginationLinks = document.querySelectorAll('.pagination .page-link');
        paginationLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                if (this.href) {
                    // Show loading state if needed
                }
            });
        });
    }

    /* ============================================================
       CONFIRM/COMPLETE SESSION - AJAX
       ============================================================ */
    function initSessionActions() {
        const confirmForms = document.querySelectorAll('form[action*="ConfirmSession"]');
        const completeForms = document.querySelectorAll('form[action*="CompleteSession"]');

        confirmForms.forEach(form => {
            form.addEventListener('submit', function (e) {
                if (!confirm('Are you sure you want to confirm this session?')) {
                    e.preventDefault();
                }
            });
        });

        completeForms.forEach(form => {
            form.addEventListener('submit', function (e) {
                if (!confirm('Mark this session as completed?')) {
                    e.preventDefault();
                }
            });
        });
    }

    /* ============================================================
       INIT
       ============================================================ */
    function init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initCounters();
                initFilters();
                initCardHover();
                initBookingModal();
                initBookingForm();
                initShortcuts();
                initSmoothScroll();
                initPagination();
                initSessionActions();
            });
        } else {
            initCounters();
            initFilters();
            initCardHover();
            initBookingModal();
            initBookingForm();
            initShortcuts();
            initSmoothScroll();
            initPagination();
            initSessionActions();
        }

        console.log('%c 👨‍🏫 Mentors module loaded! ', 'background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;');
        console.log('📌 Shortcuts: Ctrl+Shift+F to focus search, Esc to close modal');
    }

    // Start
    init();

})();