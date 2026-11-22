(function () {
    'use strict';

    var auth = document.getElementById('auth');
    var form = document.getElementById('authForm');
    var input = document.getElementById('emailInput');
    var submitBtn = document.getElementById('submitBtn');
    var errorEl = document.getElementById('authError');
    var animationEl = document.getElementById('authAnimation');

    function playAnimation() {
        if (typeof lottie === 'undefined' || !animationEl) return;
        lottie.loadAnimation({
            container: animationEl,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'assets/json/email_check_inbox.json'
        });
    }

    document.addEventListener('splash:done', function () {
        auth.classList.add('is-visible');
        playAnimation();
    });

    function showError(message) {
        errorEl.textContent = message;
        errorEl.classList.add('is-visible');
    }

    function clearError() {
        errorEl.textContent = '';
        errorEl.classList.remove('is-visible');
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    input.addEventListener('input', clearError);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = input.value.trim();

        if (!email) {
            showError('Введите почту');
            input.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showError('Некорректный адрес почты');
            input.focus();
            return;
        }

        clearError();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        input.blur();

        try { sessionStorage.setItem('smess_email', email); } catch (e) {}

        setTimeout(function () {
            window.location.href = 'code/index.html';
        }, 600);
    });
})();