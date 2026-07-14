/* ================================================================
   HOME-PROJECTS.JS — Project Marketplace functionality
   ================================================================ */

(function () {
    'use strict';

    // DOM elements
    const createBtn = document.getElementById('createProjectBtn');
    const createBtnEmpty = document.getElementById('createProjectBtnEmpty');
    const modal = document.getElementById('createProjectModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const searchInput = document.getElementById('projectSearch');
    const trackFilter = document.getElementById('trackFilter');
    const statusFilter = document.getElementById('statusFilter');

    // ============================================================
    // MODAL
    // ============================================================
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (createBtn) createBtn.addEventListener('click', openModal);
    if (createBtnEmpty) createBtnEmpty.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

    // Close modal on backdrop click
    modal.addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // ============================================================
    // SEARCH & FILTERS
    // ============================================================
    function filterProjects() {
        const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const track = trackFilter ? trackFilter.value : '';
        const status = statusFilter ? statusFilter.value : '';

        const cards = document.querySelectorAll('.project-card:not(.mini-card)');

        cards.forEach(card => {
            const title = card.querySelector('.project-title')?.textContent?.toLowerCase() || '';
            const desc = card.querySelector('.project-description')?.textContent?.toLowerCase() || '';
            const cardTrack = card.dataset.track || '';
            const cardStatus = card.dataset.status || '';

            let show = true;

            if (search && !title.includes(search) && !desc.includes(search)) {
                show = false;
            }
            if (track && cardTrack !== track) {
                show = false;
            }
            if (status && cardStatus !== status) {
                show = false;
            }

            card.style.display = show ? '' : 'none';
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterProjects);
    if (trackFilter) trackFilter.addEventListener('change', filterProjects);
    if (statusFilter) statusFilter.addEventListener('change', filterProjects);

    // ============================================================
    // ANIMATE PROGRESS BARS ON SCROLL
    // ============================================================
    function initProgressBars() {
        const bars = document.querySelectorAll('.progress-fill');
        if (!bars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(bar => observer.observe(bar));
    }

    // ============================================================
    // TAKE PROJECT CONFIRMATION
    // ============================================================
    document.querySelectorAll('form[asp-action="TakeProject"]').forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!confirm('Are you sure you want to take this project? You will become the team leader.')) {
                e.preventDefault();
            }
        });
    });

    // ============================================================
    // INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', function () {
        initProgressBars();
        console.log('%c 🚀 Project Marketplace loaded! ', 'background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;');
    });

})();