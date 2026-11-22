(function () {
    'use strict';

    var splash = document.getElementById('splash');
    var SPLASH_LIFETIME = 4000;
    var HIDE_DURATION = 1000;

    setTimeout(function () {
        splash.classList.add('is-hiding');
        setTimeout(function () {
            splash.remove();
            document.dispatchEvent(new Event('splash:done'));
        }, HIDE_DURATION);
    }, SPLASH_LIFETIME);
})();