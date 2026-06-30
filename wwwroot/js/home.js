
(function () {

  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach(i => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  function initContactPreviewForm() {
    const form = document.getElementById('contactPreviewForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;

      button.textContent = 'Message Sent';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 2200);
    });
  }

  function initAssessmentMock() {
    const options = document.querySelectorAll('.assessment-mock .assessment-option');
    if (!options.length) return;

    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('is-selected'));
        option.classList.add('is-selected');
      });
    });
  }

  function staggerHeroBars() {
    document.querySelectorAll('.hero-track-bar-fill').forEach((bar, i) => {
      bar.style.transitionDelay = `${i * 150}ms`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFaq();
    initContactPreviewForm();
    initAssessmentMock();
    staggerHeroBars();
  });

})();