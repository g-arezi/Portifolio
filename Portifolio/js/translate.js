/* ============================================================
   I18N – Tradução própria (sem serviços externos)
   O texto em português vem do próprio HTML; aqui ficam apenas
   os dicionários dos outros idiomas.
   ============================================================ */
(function initI18n() {
    const DEFAULT_LANG = 'pt';
    const STORAGE_KEY  = 'portfolio-lang';

    const LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

    const TRANSLATIONS = {
        en: {
            'meta.title':       'Portfolio | Gabriel Arezi',
            'meta.description': 'Portfolio of Gabriel Arezi, FullStack Developer.',

            'logo':          'Portfolio.',
            'nav.home':      'Home',
            'nav.about':     'About me',
            'nav.recs':      'Recommendations',
            'nav.services':  'Services',
            'nav.courses':   'Certifications',
            'nav.projects':  'Projects',

            'home.eyebrow':  "Hi, I'm",
            'home.welcome':  'Welcome to my portfolio. Here you will find my experience and projects.',
            'home.open':     'I am always open to new challenges and learning opportunities.',
            'home.linkedin': 'My LinkedIn',

            'lang.title':        'Languages',
            'lang.pt':           'Portuguese (PT-BR)',
            'lang.en':           'English',
            'lang.es':           'Spanish',
            'lang.native':       'Native',
            'lang.intermediate': 'Intermediate',

            'about.heading':  'More About <span>me</span>',
            'about.subtitle': 'Here is some information about me and what I do.',
            'about.text':     'I hold certifications in Backend Development, Java, C#, C++, .NET Framework, Node.js, MySQL, Next.js, TypeScript, PHP and Network Infrastructure. I have experience with MySQL, PostgreSQL and SQL Server databases. I am always looking to learn and keep up with new technologies and market trends.',
            'about.below':    'Below are some of my skills and the services I offer.',

            'skills.title':      'My Skills',
            'skills.complement': 'Complementary Technologies',
            'skills.networks':   'Networking',

            'recs.heading': 'My <span>Recommendations</span>',
            'recs.wbg1':    'Besides being a competent and proactive professional, he also has an excellent eye for design and user experience, which made all the difference in creating modern and functional interfaces. He was agile, attentive and always willing to propose creative solutions to the challenges that arose.',
            'recs.wbg2':    'We strongly recommend <strong>Gabriel</strong>\'s work to any company looking for a committed, versatile developer with a broad vision of technology. He undoubtedly added great value to our projects.',
            'recs.itsd1':   '<strong>Gabriel</strong> is a highly competent and dedicated professional.',
            'recs.itsd2':   'He works with excellence as a programmer, always presenting creative, efficient solutions with a proactive approach to challenges.',
            'recs.itsd3':   'In every project he was involved in, he showed commitment, initiative and technical quality.',
            'recs.itsd4':   'He undoubtedly added great value to our company\'s deliveries. I strongly recommend his work.',
            'recs.prev':    'Previous recommendation',
            'recs.next':    'Next recommendation',

            'services.heading':  'My <span>Services</span>',
            'services.fs.title': 'Full Stack Developer',
            'services.fs.desc':  'I build websites and software following development best practices.',
            'services.fs.front': '<strong>Frontend:</strong> HTML5, CSS3, JavaScript, React, Next.js, TypeScript and PHP.',
            'services.fs.back':  '<strong>Backend:</strong> C#, C++, .NET Framework, Node.js, TypeScript and PHP, with experience in MySQL, PostgreSQL and SQL Server.',
            'services.fs.other': '<strong>Other Technologies:</strong> Docker, Kubernetes, Git, CI/CD, RESTful APIs, GraphQL and agile methodologies (Scrum and Kanban).',
            'services.auto.title': 'Automation',
            'services.auto.1':   'Building automation workflows to optimize business processes with n8n and Zapier.',
            'services.auto.2':   'Developing custom scripts to automate repetitive tasks.',
            'services.auto.3':   'Integrating systems and APIs to streamline communication between platforms.',
            'services.auto.4':   'ChatBots for automated customer service via WhatsApp, Telegram and Instagram.',

            'courses.heading':      'My <span>Courses</span> & Certifications',
            'courses.instructor':   'Instructor:',
            'courses.completed':    'Completed',
            'courses.php.desc':     'Complete PHP 8 development course, using development best practices and agile methodologies.',
            'courses.db.title':     'Databases',
            'courses.db.desc':      'SQL language concepts, relational and non-relational databases (MySQL, PostgreSQL, MongoDB...)',
            'courses.cpp.title':    'C++ Course',
            'courses.cpp.desc':     'Advanced C++ language features with step-by-step code examples for better learning.',
            'courses.fs.desc':      'Fullstack application with Spring Boot 2 and Angular 11. REST API with MySQL, JPA/Hibernate, cloud deployment (Heroku and GitHub Pages).',
            'courses.ads.title':    'Systems Analysis and Development',
            'courses.ads.duration': '2 years',
            'courses.ads.status':   'Graduation: July 2027',
            'courses.ads.desc':     'Technology degree: Programming Logic, OOP, Web Development, Databases, Software Engineering, DevOps, Agile Methodologies (Scrum, Kanban), Networking and more.',

            'projects.heading':        'My <span>Projects</span> on GitHub',
            'projects.tabRepos':       'My Repositories',
            'projects.tabStarred':     'Starred',
            'projects.loading':        'Loading projects...',
            'projects.loadingStarred': 'Loading starred...',
            'projects.updated':        'Updated:',
            'projects.view':           'View on GitHub',
            'projects.empty':          'No repositories found.',
            'projects.error':          'Error loading repositories.',
            'projects.emptyStarred':   'No starred repositories found.',
            'projects.errorStarred':   'Error loading starred repositories.',

            'footer.rights': 'All Rights Reserved.',
            'footer.top':    'Back to top',

            'panel.open':  'Change language',
            'panel.title': 'Choose language',
            'panel.close': 'Close',
        },

        es: {
            'meta.title':       'Portafolio | Gabriel Arezi',
            'meta.description': 'Portafolio de Gabriel Arezi, Desarrollador FullStack.',

            'logo':          'Portafolio.',
            'nav.home':      'Inicio',
            'nav.about':     'Sobre mí',
            'nav.recs':      'Recomendaciones',
            'nav.services':  'Servicios',
            'nav.courses':   'Certificaciones',
            'nav.projects':  'Proyectos',

            'home.eyebrow':  'Hola, soy',
            'home.welcome':  'Bienvenido a mi portafolio. Aquí encontrarás mi experiencia y proyectos.',
            'home.open':     'Siempre estoy abierto a nuevos desafíos y oportunidades de aprendizaje.',
            'home.linkedin': 'Mi LinkedIn',

            'lang.title':        'Idiomas',
            'lang.pt':           'Portugués (PT-BR)',
            'lang.en':           'Inglés',
            'lang.es':           'Español',
            'lang.native':       'Nativo',
            'lang.intermediate': 'Intermedio',

            'about.heading':  'Más Sobre <span>mí</span>',
            'about.subtitle': 'Aquí tienes algo de información sobre mí y lo que hago.',
            'about.text':     'Tengo certificaciones en Desarrollo Backend, Java, C#, C++, .NET Framework, Node.js, MySQL, Next.js, TypeScript, PHP e Infraestructura de Redes. Tengo experiencia con bases de datos MySQL, PostgreSQL y SQL Server. Siempre busco aprender y mantenerme al día con las nuevas tecnologías y tendencias del mercado.',
            'about.below':    'A continuación están algunas de mis habilidades y los servicios que ofrezco.',

            'skills.title':      'Mis Habilidades',
            'skills.complement': 'Tecnologías Complementarias',
            'skills.networks':   'Redes',

            'recs.heading': 'Mis <span>Recomendaciones</span>',
            'recs.wbg1':    'Además de ser un profesional competente y proactivo, también tiene un excelente ojo para el diseño y la experiencia de usuario, lo que marcó la diferencia en la creación de interfaces modernas y funcionales. Fue ágil, atento y siempre dispuesto a proponer soluciones creativas para los desafíos que surgieron.',
            'recs.wbg2':    'Recomendamos ampliamente el trabajo de <strong>Gabriel</strong> a cualquier empresa que busque un desarrollador comprometido, versátil y con una visión amplia de la tecnología. Sin duda, aportó mucho valor a nuestros proyectos.',
            'recs.itsd1':   '<strong>Gabriel</strong> es un profesional altamente competente y dedicado.',
            'recs.itsd2':   'Trabaja con excelencia como programador, siempre presentando soluciones creativas y eficientes, con una mirada proactiva ante los desafíos.',
            'recs.itsd3':   'En todos los proyectos en los que participó, demostró compromiso, iniciativa y calidad técnica.',
            'recs.itsd4':   'Sin duda, aportó mucho valor a las entregas de nuestra empresa. Recomiendo ampliamente su trabajo.',
            'recs.prev':    'Recomendación anterior',
            'recs.next':    'Siguiente recomendación',

            'services.heading':  'Mis <span>Servicios</span>',
            'services.fs.title': 'Desarrollador Full Stack',
            'services.fs.desc':  'Desarrollo sitios web y software aplicando las mejores prácticas de desarrollo.',
            'services.fs.front': '<strong>Frontend:</strong> HTML5, CSS3, JavaScript, React, Next.js, TypeScript y PHP.',
            'services.fs.back':  '<strong>Backend:</strong> C#, C++, .NET Framework, Node.js, TypeScript y PHP, con experiencia en MySQL, PostgreSQL y SQL Server.',
            'services.fs.other': '<strong>Otras Tecnologías:</strong> Docker, Kubernetes, Git, CI/CD, APIs RESTful, GraphQL y metodologías ágiles (Scrum y Kanban).',
            'services.auto.title': 'Automatización',
            'services.auto.1':   'Creación de flujos de automatización para optimizar procesos empresariales con n8n y Zapier.',
            'services.auto.2':   'Desarrollo de scripts personalizados para automatizar tareas repetitivas.',
            'services.auto.3':   'Integración de sistemas y APIs para facilitar la comunicación entre plataformas.',
            'services.auto.4':   'ChatBots para atención automatizada vía WhatsApp, Telegram e Instagram.',

            'courses.heading':      'Mis <span>Cursos</span> y Certificaciones',
            'courses.instructor':   'Instructor:',
            'courses.completed':    'Completado',
            'courses.php.desc':     'Curso completo de desarrollo en PHP 8, aplicando las mejores prácticas de desarrollo y metodologías ágiles.',
            'courses.db.title':     'Bases de Datos',
            'courses.db.desc':      'Conceptos del lenguaje SQL, bases de datos relacionales y no relacionales (MySQL, PostgreSQL, MongoDB...)',
            'courses.cpp.title':    'Curso de C++',
            'courses.cpp.desc':     'Recursos avanzados del lenguaje C++ con ejemplos de código paso a paso para un mejor aprendizaje.',
            'courses.fs.desc':      'Aplicación Fullstack con Spring Boot 2 y Angular 11. API REST con MySQL, JPA/Hibernate, despliegue en la nube (Heroku y GitHub Pages).',
            'courses.ads.title':    'Análisis y Desarrollo de Sistemas',
            'courses.ads.duration': '2 años',
            'courses.ads.status':   'Finalización: Julio 2027',
            'courses.ads.desc':     'Carrera tecnológica: Lógica de Programación, POO, Desarrollo Web, Bases de Datos, Ingeniería de Software, DevOps, Metodologías Ágiles (Scrum, Kanban), Redes y más.',

            'projects.heading':        'Mis <span>Proyectos</span> en GitHub',
            'projects.tabRepos':       'Mis Repositorios',
            'projects.tabStarred':     'Favoritos',
            'projects.loading':        'Cargando proyectos...',
            'projects.loadingStarred': 'Cargando favoritos...',
            'projects.updated':        'Actualizado:',
            'projects.view':           'Ver en GitHub',
            'projects.empty':          'No se encontraron repositorios.',
            'projects.error':          'Error al cargar los repositorios.',
            'projects.emptyStarred':   'No se encontraron favoritos.',
            'projects.errorStarred':   'Error al cargar los favoritos.',

            'footer.rights': 'Todos los Derechos Reservados.',
            'footer.top':    'Volver arriba',

            'panel.open':  'Cambiar idioma',
            'panel.title': 'Elegir idioma',
            'panel.close': 'Cerrar',
        },
    };

    /* ------ Original (Portuguese) content, captured on first pass ------ */
    const originals = new WeakMap();
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalMeta = {
        title:       document.title,
        description: metaDescription ? metaDescription.getAttribute('content') : '',
        lang:        document.documentElement.lang,
    };

    let currentLang = DEFAULT_LANG;

    function lookup(key) {
        const dict = TRANSLATIONS[currentLang];
        return dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
    }

    function getOriginal(el, slot, read) {
        let store = originals.get(el);
        if (!store) { store = {}; originals.set(el, store); }
        if (!(slot in store)) store[slot] = read();
        return store[slot];
    }

    function selectAll(root, selector) {
        const list = Array.from(root.querySelectorAll(selector));
        if (root.matches && root.matches(selector)) list.unshift(root);
        return list;
    }

    /* ------ Apply the current language to a subtree ------ */
    function apply(root = document) {
        selectAll(root, '[data-i18n]').forEach(el => {
            const original = getOriginal(el, 'text', () => el.textContent);
            el.textContent = lookup(el.dataset.i18n) ?? original;
        });

        selectAll(root, '[data-i18n-html]').forEach(el => {
            const original = getOriginal(el, 'html', () => el.innerHTML);
            el.innerHTML = lookup(el.dataset.i18nHtml) ?? original;
        });

        selectAll(root, '[data-i18n-attr]').forEach(el => {
            el.dataset.i18nAttr.split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                if (!attr || !key) return;
                const original = getOriginal(el, 'attr:' + attr, () => el.getAttribute(attr));
                el.setAttribute(attr, lookup(key) ?? original);
            });
        });

        selectAll(root, 'time[datetime]').forEach(el => {
            const date = new Date(el.getAttribute('datetime'));
            if (!isNaN(date)) el.textContent = date.toLocaleDateString(LOCALES[currentLang]);
        });
    }

    function applyMeta() {
        document.title = lookup('meta.title') ?? originalMeta.title;
        if (metaDescription) metaDescription.setAttribute('content', lookup('meta.description') ?? originalMeta.description);
        document.documentElement.lang = currentLang === DEFAULT_LANG ? originalMeta.lang : LOCALES[currentLang];
    }

    /* ------ Persistence ------ */
    function loadSavedLang() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function saveLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function detectLang() {
        const saved = loadSavedLang();
        if (saved && LOCALES[saved]) return saved;

        const browser = (navigator.language || '').slice(0, 2).toLowerCase();
        return LOCALES[browser] ? browser : DEFAULT_LANG;
    }

    function setLanguage(lang) {
        if (!LOCALES[lang]) lang = DEFAULT_LANG;
        currentLang = lang;
        apply(document);
        applyMeta();
        updateOptions();
    }

    window.i18n = {
        apply,
        setLanguage,
        get lang() { return currentLang; },
    };

    /* ============================================================
       LANGUAGE PANEL (dropdown / modal)
       ============================================================ */
    const toggleBtn = document.getElementById('translate-toggle');
    const panel     = document.getElementById('gt-panel');
    const dialog    = document.getElementById('gt-dialog');
    const closeBtn  = document.getElementById('gt-close');
    const backdrop  = document.getElementById('gt-backdrop');
    const options   = document.querySelectorAll('.lang-option');

    function updateOptions() {
        options.forEach(opt => {
            const active = opt.dataset.lang === currentLang;
            opt.classList.toggle('active', active);
            opt.setAttribute('aria-selected', String(active));
        });
    }

    setLanguage(detectLang());

    if (!toggleBtn || !panel) return;

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

    /* ------ Reposition panel so it never overflows the viewport ------ */
    function repositionPanel() {
        // Only adjust on desktop (modal handles mobile separately)
        if (window.matchMedia('(max-width: 768px)').matches) return;

        // Reset any previous inline adjustment
        panel.style.bottom = '';
        panel.style.top    = '';

        const rect       = dialog.getBoundingClientRect();
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
            const active = dialog.querySelector('.lang-option.active');
            const focusable = getFocusableElements(dialog);
            (active || focusable[0])?.focus();
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
        if (panel.classList.contains('open')) closePanel();
        else openPanel();
    });

    closeBtn.addEventListener('click', e => { e.preventDefault(); closePanel(); });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            setLanguage(opt.dataset.lang);
            saveLang(opt.dataset.lang);
            closePanel();
        });
    });
})();
