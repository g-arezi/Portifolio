/* ============================================================
   GOOGLE TRANSLATE – Lazy-load panel (dropdown / modal)
   ============================================================ */
(function initTranslate() {
    const toggleBtn = document.getElementById('translate-toggle');
    const panel     = document.getElementById('gt-panel');
    const dialog    = document.getElementById('gt-dialog');
    const closeBtn  = document.getElementById('gt-close');
    const backdrop  = document.getElementById('gt-backdrop');
    const resetBtn  = document.getElementById('gt-reset');

    if (!toggleBtn || !panel) return;

    let gtLoaded = false;

    /* ------ Helpers ------ */
    function getFocusableElements(el) {
        const selector = [
            'a[href]', 'button:not([disabled])', 'input:not([disabled])',
            'select:not([disabled])', 'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        return Array.from(el.querySelectorAll(selector)).filter(child =>
            child.offsetWidth > 0 || child.offsetHeight > 0 || child.getClientRects().length > 0
        );
    }

    /* ------ Google Translate init callback ------ */
    window.googleTranslateElementInit = function () {
        try {
            new google.translate.TranslateElement(
                { pageLanguage: 'pt', includedLanguages: '', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
                'google_translate_element'
            );
        } catch (err) {
            console.warn('Erro ao inicializar o Google Translate:', err);
        }
    };

    /* ------ Lazy load script ------ */
    function loadGoogleTranslateScript() {
        if (gtLoaded) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const script  = document.createElement('script');
            script.src    = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async  = true;
            script.onload = () => { gtLoaded = true; setTimeout(resolve, 250); };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /* ------ Reposition panel so it never overflows the viewport ------ */
    function repositionPanel() {
        // Only adjust on desktop (modal handles mobile separately)
        if (window.matchMedia('(max-width: 768px)').matches) return;

        // Reset any previous inline adjustment
        panel.style.bottom = '';
        panel.style.top    = '';

        const rect       = dialog.getBoundingClientRect();
        const viewportH  = window.innerHeight;
        const MARGIN     = 8; // px gap from edge

        // If dialog goes off the top, pin it to the top instead
        if (rect.top < MARGIN) {
            const overshoot = MARGIN - rect.top;
            const currentBottom = parseFloat(getComputedStyle(panel).bottom) || 0;
            panel.style.bottom = Math.max(0, currentBottom - overshoot) + 'px';
        }

        // If dialog goes off the right edge, shift left
        if (rect.right > window.innerWidth - MARGIN) {
            panel.style.right = MARGIN + 'px';
        }
    }

    /* ------ Panel open / close ------ */
    function openPanel() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        toggleBtn.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('open');
        if (isMobile) panel.classList.add('gt-modal');
        dialog.setAttribute('aria-modal', String(isMobile));

        // Allow the browser to paint the dialog before measuring
        requestAnimationFrame(() => {
            repositionPanel();
            const focusable = getFocusableElements(dialog);
            if (focusable.length) focusable[0].focus();
        });

        document.addEventListener('keydown', handleKeyDown);
        backdrop.addEventListener('click', closePanel);
    }

    function closePanel() {
        toggleBtn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('open', 'gt-modal');
        dialog.setAttribute('aria-modal', 'false');
        // Reset any inline position overrides from repositionPanel
        panel.style.bottom = '';
        panel.style.right  = '';
        panel.style.top    = '';
        toggleBtn.focus();
        document.removeEventListener('keydown', handleKeyDown);
        backdrop.removeEventListener('click', closePanel);
    }

    /* ------ Focus trap & Escape key ------ */
    function handleKeyDown(e) {
        if (e.key === 'Escape') { closePanel(); return; }

        if (e.key === 'Tab') {
            const focusable = getFocusableElements(dialog);
            if (!focusable.length) return;
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    /* ------ Reset translation ------ */
    function resetTranslation() {
        const select = document.querySelector('#google_translate_element select');
        if (select) {
            select.selectedIndex = 0;
            select.dispatchEvent(new Event('change'));
        } else {
            location.reload();
        }
    }

    /* ------ Hide injected Google banner ------ */
    function hideTranslateBanner() {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) banner.style.display = 'none';
    }
    setInterval(hideTranslateBanner, 800);

    /* ------ Adjust aria-modal on resize ------ */
    window.addEventListener('resize', () => {
        if (!panel.classList.contains('open')) return;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        dialog.setAttribute('aria-modal', String(isMobile));
        panel.classList.toggle('gt-modal', isMobile);
    });

    /* ------ Event wiring ------ */
    toggleBtn.addEventListener('click', e => {
        e.preventDefault();
        if (panel.classList.contains('open')) { closePanel(); return; }
        loadGoogleTranslateScript()
            .then(openPanel)
            .catch(openPanel); // open even if script fails
    });

    closeBtn.addEventListener('click', e => { e.preventDefault(); closePanel(); });
    resetBtn.addEventListener('click', e => { e.preventDefault(); resetTranslation(); });
})();

