/**
 * Script para gerenciamento do tema escuro/claro
 * Por padrão, o site inicia no tema escuro
 */

 /* ============================================================
   THEME – Dark / Light mode management
   Persists preference in localStorage. Defaults to dark mode.
   ============================================================ */
(function initTheme() {
    const darkModeIcon = document.querySelector('#darkMode-icon');
    if (!darkModeIcon) return;

    /* ------ Persistence ------ */
    function saveTheme(isDark) {
        localStorage.setItem('darkMode', String(isDark));
    }

    function loadTheme() {
        const saved = localStorage.getItem('darkMode');
        return saved === null ? true : saved === 'true';
    }

    /* ------ Apply theme ------ */
    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        darkModeIcon.classList.toggle('bx-sun', isDark);

        const profileLogo = document.querySelector('.profile-logo');
        if (profileLogo) {
            const darkLogo = profileLogo.getAttribute('data-logo-dark');
            const lightLogo = profileLogo.getAttribute('data-logo-light');
            profileLogo.src = isDark ? (darkLogo || profileLogo.src) : (lightLogo || profileLogo.src);
        }
    }

    /* ------ Toggle on click ------ */
    darkModeIcon.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
        saveTheme(isDark);
    });

    /* ------ Keyboard accessibility ------ */
    darkModeIcon.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            darkModeIcon.click();
        }
    });

    /* ------ Init on DOMContentLoaded ------ */
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(loadTheme());
    });

    // Apply immediately (before DOMContentLoaded) to avoid flash
    applyTheme(loadTheme());
})();
