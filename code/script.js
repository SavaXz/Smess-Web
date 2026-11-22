(function () {
    'use strict';

    var code = document.getElementById('code');
    var animationEl = document.getElementById('codeAnimation');
    var cells = Array.prototype.slice.call(document.querySelectorAll('.code__cell'));
    var keyboard = document.getElementById('codeKeyboard');
    var errorEl = document.getElementById('codeError');
    var subtitleEl = document.getElementById('codeSubtitle');

    var CODE_LENGTH = 5;
    var value = '';
    var isLocked = false;

    try {
        var savedEmail = sessionStorage.getItem('smess_email');
        if (savedEmail) {
            subtitleEl.textContent = 'Мы отправили код на ' + savedEmail;
        }
    } catch (e) {}

    function playAnimation() {
        if (typeof lottie === 'undefined' || !animationEl) return;
        lottie.loadAnimation({
            container: animationEl,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '../assets/json/code_laptop.json'
        });
    }

    function render() {
        cells.forEach(function (cell, i) {
            var ch = value[i] || '';
            cell.textContent = ch;
            cell.classList.toggle('is-filled', ch !== '');
            cell.classList.toggle('is-active', i === value.length && !isLocked);
        });
    }

    function showError(message) {
        errorEl.textContent = message;
        errorEl.classList.add('is-visible');
        cells.forEach(function (cell) { cell.classList.add('is-error'); });
    }

    function clearError() {
        errorEl.textContent = '';
        errorEl.classList.remove('is-visible');
        cells.forEach(function (cell) { cell.classList.remove('is-error'); });
    }

    function submitCode() {
        isLocked = true;
        render();
        clearError();

        setTimeout(function () {
            var isValid = value === '12345';

            if (isValid) {
                subtitleEl.textContent = 'Код верный. Загрузка...';
            } else {
                isLocked = false;
                showError('Неверный код. Попробуйте ещё раз.');
                value = '';
                render();
            }
        }, 500);
    }

    function addDigit(digit) {
        if (isLocked || value.length >= CODE_LENGTH) return;
        clearError();
        value += digit;
        render();
        if (value.length === CODE_LENGTH) submitCode();
    }

    function backspace() {
        if (isLocked || !value.length) return;
        clearError();
        value = value.slice(0, -1);
        render();
    }

    keyboard.addEventListener('click', function (event) {
        var button = event.target.closest('.code__key');
        if (!button) return;
        var key = button.getAttribute('data-key');
        if (!key) return;
        if (key === 'backspace') backspace();
        else addDigit(key);
    });

    document.addEventListener('keydown', function (event) {
        if (isLocked) return;
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
            addDigit(event.key);
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            backspace();
        }
    });

    code.classList.add('is-visible');
    playAnimation();
    render();
})();