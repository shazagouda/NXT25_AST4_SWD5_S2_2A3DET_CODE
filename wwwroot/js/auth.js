(function () {

    'use strict';

    function initRoleSelection() {
        const roleCards = document.querySelectorAll('.role-card');
        const forms = {
            student: document.getElementById('studentForm'),
            mentor: document.getElementById('mentorForm'),
            company: document.getElementById('companyForm')
        };

        if (!roleCards.length) return;
        Object.values(forms).forEach(form => {
            if (form) form.style.display = 'none';
        });

        roleCards.forEach(card => {
            card.addEventListener('click', function () {
                roleCards.forEach(c => c.classList.remove('active'));

                this.classList.add('active');

                const role = this.dataset.role;

                Object.keys(forms).forEach(key => {
                    if (forms[key]) {
                        forms[key].style.display = (key === role) ? 'block' : 'none';
                    }
                });

                const subtitle = document.querySelector('.auth-subtitle');
                const roleNames = {
                    student: 'Student',
                    mentor: 'Mentor',
                    company: 'Company'
                };
                if (subtitle && roleNames[role]) {
                    subtitle.textContent = `Complete your ${roleNames[role]} registration`;
                }
            });
        });
    }

    function initPasswordToggle() {
        document.querySelectorAll('.password-toggle').forEach(button => {
            button.addEventListener('click', function () {
                const wrapper = this.closest('.password-input-wrapper');
                const input = wrapper.querySelector('.form-control');
                const icon = this.querySelector('.eye-icon');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = '👁️‍🗨️';
                } else {
                    input.type = 'password';
                    icon.textContent = '👁️';
                }
            });
        });
    }

    function initPasswordStrength() {
        document.querySelectorAll('.password-field .form-control[type="password"]').forEach(input => {
            input.addEventListener('input', function () {
                const field = this.closest('.password-field');
                const meter = field.querySelector('.password-strength-meter');
                if (!meter) return;

                const bar = meter.querySelector('.strength-bar');
                const text = meter.querySelector('.strength-text');
                const password = this.value;

                const existingFill = bar.querySelector('.strength-fill');

                const fill = document.createElement('div');
                fill.className = 'strength-fill';
                bar.appendChild(fill);

                if (password.length === 0) {
                    fill.style.width = '0%';
                    text.textContent = '';
                    return;
                }

                const strength = calculatePasswordStrength(password);
                const levels = ['weak', 'fair', 'good', 'strong'];
                const labels = ['Weak', 'Fair', 'Good', 'Strong'];

                fill.className = `strength-fill ${levels[strength]}`;
                text.textContent = labels[strength];
            });
        });
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return 0; 
        if (score <= 4) return 1; 
        if (score <= 6) return 2; 
        return 3; 
    }

    function initFormLoading() {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.addEventListener('submit', function () {
                const submitBtn = this.querySelector('button[type="submit"]');
                if (!submitBtn) return;

                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');

                if (btnText && btnLoader) {
                    submitBtn.classList.add('btn-loading');
                    btnText.textContent = 'Please wait...';
                    btnLoader.style.display = 'inline-flex';
                    submitBtn.disabled = true;
                }
            });
        });
    }

    function initValidation() {
        // Add validation classes on blur
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', function () {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });

            input.addEventListener('input', function () {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                        return;
                    }
                    this.classList.remove('is-invalid');
                }
            });
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function initPasswordConfirmation() {
        document.querySelectorAll('.auth-form').forEach(form => {
            const password = form.querySelector('input[name="Password"]');
            const confirm = form.querySelector('input[name="ConfirmPassword"]');

            if (password && confirm) {
                const checkMatch = function () {
                    if (confirm.value.length > 0) {
                        if (password.value !== confirm.value) {
                            confirm.classList.add('is-invalid');
                            confirm.setCustomValidity('Passwords do not match');
                        } else {
                            confirm.classList.remove('is-invalid');
                            confirm.setCustomValidity('');
                        }
                    }
                };

                password.addEventListener('input', checkMatch);
                confirm.addEventListener('input', checkMatch);
            }
        });
    }

    function init() {
        initRoleSelection();
        initPasswordToggle();
        initPasswordStrength();
        initFormLoading();
        initValidation();
        initPasswordConfirmation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();