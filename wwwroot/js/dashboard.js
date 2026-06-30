
(function () {
    'use strict';

    const CONFIG = {
        animationDuration: 1200,
        chartColors: {
            blue: '#2F6FED',
            teal: '#15C6AE',
            amber: '#F2A33C',
            purple: '#8B5CF6',
            pink: '#EC4899',
            red: '#E14F4F',
            green: '#22C55E'
        }
    };

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function animateCounter(element, target, suffix = '', duration = 1400) {
        const start = 0;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(start + (target - start) * eased);
            element.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function initCounters() {
        const counters = $$('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    const suffix = text.replace(/[0-9]/g, '');
                    if (!isNaN(num)) {
                        el.textContent = '0';
                        animateCounter(el, num, suffix);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => observer.observe(el));
    }

    function initProgressBars() {
        const bars = $$('.stat-progress-fill, .progress-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.dataset.progress || entry.target.style.width || '0%';
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(el => {
            const w = el.dataset.progress || el.style.width || '0%';
            el.style.width = '0%';
            observer.observe(el);
        });
    }
    function drawChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 20, bottom: 30, left: 30, right: 20 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#94A0B8' : '#5B6478';
        const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const maxVal = Math.max(...data.map(d => d.value)) * 1.2;
        const barWidth = Math.min(chartWidth / data.length * 0.6, 50);
        const gap = (chartWidth - barWidth * data.length) / (data.length + 1);

        data.forEach((item, index) => {
            const x = padding.left + gap + index * (barWidth + gap);
            const barHeight = (item.value / maxVal) * chartHeight;
            const y = padding.top + chartHeight - barHeight;

            const grad = ctx.createLinearGradient(x, y, x, padding.top + chartHeight);
            const color = options.colors?.[index] || CONFIG.chartColors.blue;
            grad.addColorStop(0, color);
            grad.addColorStop(1, color + '44');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, 4);

            ctx.fillStyle = textColor;
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, padding.top + chartHeight + 18);
        });

        setTimeout(() => {
            const bars = canvas.querySelectorAll('.bar-fill');
            bars.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.height = bar.dataset.height || '0%';
                }, i * 100);
            });
        }, 300);
    }

    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            if (r > w / 2) r = w / 2;
            if (r > h / 2) r = h / 2;
            this.moveTo(x + r, y);
            this.lineTo(x + w - r, y);
            this.quadraticCurveTo(x + w, y, x + w, y + r);
            this.lineTo(x + w, y + h - r);
            this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            this.lineTo(x + r, y + h);
            this.quadraticCurveTo(x, y + h, x, y + h - r);
            this.lineTo(x, y + r);
            this.quadraticCurveTo(x, y, x + r, y);
            this.closePath();
            return this;
        };
    }

    function initCharts() {
        const chartData = [
            { label: 'Jan', value: 65 },
            { label: 'Feb', value: 78 },
            { label: 'Mar', value: 82 },
            { label: 'Apr', value: 95 },
            { label: 'May', value: 88 },
            { label: 'Jun', value: 102 },
            { label: 'Jul', value: 115 },
            { label: 'Aug', value: 120 }
        ];

        const colors = [
            CONFIG.chartColors.blue,
            CONFIG.chartColors.teal,
            CONFIG.chartColors.amber,
            CONFIG.chartColors.purple,
            CONFIG.chartColors.pink,
            CONFIG.chartColors.blue,
            CONFIG.chartColors.teal,
            CONFIG.chartColors.green
        ];

        drawChart('activityChart', chartData, { colors });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                drawChart('activityChart', chartData, { colors });
            }, 250);
        });

        const themeObserver = new MutationObserver(() => {
            drawChart('activityChart', chartData, { colors });
        });
        const html = document.documentElement;
        themeObserver.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    }

    function initTaskList() {
        const tasks = $$('.task-item');
        tasks.forEach(task => {
            const check = task.querySelector('.task-check');
            if (!check) return;

            check.addEventListener('click', function (e) {
                e.stopPropagation();
                this.classList.toggle('completed');
                const title = task.querySelector('.task-title');
                if (title) title.classList.toggle('completed');

                updateTaskProgress();
            });

            task.addEventListener('click', function (e) {
                if (e.target.closest('.task-check')) return;
                const check = this.querySelector('.task-check');
                if (check) check.click();
            });
        });
    }

    function updateTaskProgress() {
        const total = $$('.task-item').length;
        const completed = $$('.task-item .task-check.completed').length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        const progressBar = document.querySelector('.task-progress-fill');
        if (progressBar) {
            progressBar.style.width = percent + '%';
        }

        const progressText = document.querySelector('.task-progress-text');
        if (progressText) {
            progressText.textContent = percent + '%';
        }
    }

    function initTabs() {
        const tabs = $$('.card-actions .tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const parent = this.closest('.card-actions');
                parent.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const tabName = this.dataset.tab || 'overview';
                console.log('Switched to tab:', tabName);
            });
        });
    }

    function initStatCards() {
        const cards = $$('.stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                const trend = this.querySelector('.stat-trend');
                if (trend) {
                    trend.style.transform = 'scale(1.1)';
                }
            });
            card.addEventListener('mouseleave', function () {
                const trend = this.querySelector('.stat-trend');
                if (trend) {
                    trend.style.transform = 'scale(1)';
                }
            });
        });
    }

    function initProjectCards() {
        const cards = $$('.project-card, .recommended-card');
        cards.forEach(card => {
            card.addEventListener('click', function () {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    }

    function initMentorList() {
        const mentors = $$('.mentor-item');
        mentors.forEach(mentor => {
            mentor.addEventListener('click', function () {
                const name = this.querySelector('.mentor-name')?.textContent || 'Mentor';
                console.log('Viewing mentor profile:', name);
            });
        });
    }

    function showNotification(message, type = 'info') {
        const colors = {
            info: '#2F6FED',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#E14F4F'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 9999;
            max-width: 400px;
            cursor: pointer;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);

        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        });
    }

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
                const index = parseInt(e.key) - 1;
                const cards = $$('.stat-card');
                if (cards[index]) {
                    cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cards[index].style.boxShadow = '0 0 0 3px var(--color-blue-600)';
                    setTimeout(() => {
                        cards[index].style.boxShadow = '';
                    }, 1500);
                }
            }

            if (e.key === 'r' && e.ctrlKey) {
                e.preventDefault();
                showNotification('🔄 Refreshing dashboard data...', 'info');
                setTimeout(() => {
                    showNotification('✅ Dashboard updated!', 'success');
                }, 1000);
            }
        });
    }

    function init() {
        initCounters();
        initProgressBars();
        initCharts();
        initTaskList();
        initTabs();
        initStatCards();
        initProjectCards();
        initMentorList();
        initKeyboardShortcuts();

        setTimeout(() => {
            showNotification('👋 Welcome back! Ready to ship something amazing?', 'info');
        }, 1500);

        console.log('%c 🚀 Dashboard loaded successfully! ', 'background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;');
        console.log('%c 🔑 Shortcuts: Ctrl+1-6 to jump to stats, Ctrl+R to refresh', 'color:#94A0B8;font-family:monospace;font-size:11px;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();