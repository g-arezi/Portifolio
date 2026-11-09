/* ============================================================
   EFFECTS – 3D background, tilt, reveal, typing, counters...
   Pure progressive enhancement: the page works without this file.
   ============================================================ */
(function effects() {
    const root          = document.documentElement;
    const reduceMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer   = window.matchMedia('(pointer: fine)').matches;
    const isDark        = () => document.body.classList.contains('dark-mode');

    if (reduceMotion) root.classList.add('no-motion');

    /* ------------------------------------------------------------
       SCROLL PROGRESS BAR
       ------------------------------------------------------------ */
    const progress = document.querySelector('.scroll-progress');
    let scrollRatio = 0, heroRatio = 0;

    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollRatio = max > 0 ? window.scrollY / max : 0;
        heroRatio   = Math.min(window.scrollY / window.innerHeight, 1.5);
        if (progress) progress.style.transform = `scaleX(${scrollRatio})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------------------
       SCROLL REVEAL (IntersectionObserver)
       ------------------------------------------------------------ */
    const REVEAL_GROUPS = [
        { sel: '.home-content > *',                  cls: '',           stagger: .08 },
        { sel: '.home-panel > .profile-card',        cls: 'from-right', stagger: 0 },
        { sel: '.home-panel > .language-skills',     cls: '',           stagger: 0, delay: .35 },
        { sel: '.heading, .section-title',           cls: '',           stagger: 0 },
        { sel: '.about-content > :not(.heading)',    cls: '',           stagger: .1 },
        { sel: '.skill-category',                    cls: 'flip',       stagger: .12 },
        { sel: '.complement-section',                cls: '',           stagger: 0 },
        { sel: '.testimonial-wrapper',               cls: 'flip',       stagger: 0 },
        { sel: '.services-box',                      cls: 'flip',       stagger: .15 },
        { sel: '.course-card',                       cls: 'flip',       stagger: .1, mod: 3 },
        { sel: '.projects-tabs',                     cls: '',           stagger: 0 },
    ];

    const revealTargets = [];
    REVEAL_GROUPS.forEach(group => {
        document.querySelectorAll(group.sel).forEach((el, i) => {
            if (el.classList.contains('reveal')) return;
            el.classList.add('reveal');
            if (group.cls) el.classList.add(group.cls);
            const index = group.mod ? i % group.mod : i;
            el.style.setProperty('--delay', `${(group.delay || 0) + index * group.stagger}s`);
            revealTargets.push(el);
        });
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    } else {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
        revealTargets.forEach(el => io.observe(el));
    }

    // Hero title letters
    const heroTitle = document.querySelector('.home-content h1');
    if (heroTitle) requestAnimationFrame(() => setTimeout(() => heroTitle.classList.add('split-ready'), 60));

    /* ------------------------------------------------------------
       TYPING EFFECT
       ------------------------------------------------------------ */
    const typed = document.querySelector('.typed[data-words]');
    if (typed && !reduceMotion) {
        const words = typed.dataset.words.split('|');
        let w = 0, c = words[0].length, deleting = true;

        (function tick() {
            const word = words[w];
            c += deleting ? -1 : 1;
            typed.textContent = word.slice(0, c);

            let delay = deleting ? 40 : 85;
            if (!deleting && c === word.length) { deleting = true; delay = 2200; }
            else if (deleting && c === 0)       { deleting = false; w = (w + 1) % words.length; delay = 350; }
            setTimeout(tick, delay);
        })();
    }

    /* ------------------------------------------------------------
       COUNTERS
       ------------------------------------------------------------ */
    const counters = document.querySelectorAll('[data-count]');
    function runCounter(el) {
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = target + suffix; return; }
        const start = performance.now(), dur = 1800;
        (function step(now) {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
            if (t < 1) requestAnimationFrame(step);
        })(start);
    }
    if ('IntersectionObserver' in window) {
        const cio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                runCounter(entry.target);
                cio.unobserve(entry.target);
            });
        }, { threshold: .6 });
        counters.forEach(el => cio.observe(el));
    } else {
        counters.forEach(runCounter);
    }

    /* ------------------------------------------------------------
       3D TILT + SPOTLIGHT (event delegation – also covers the
       GitHub cards rendered later)
       ------------------------------------------------------------ */
    const TILT_SEL = '[data-tilt], .skill-category, .services-box, .course-card, .project-card';
    const SPOT_SEL = '.skill-category, .services-box, .course-card, .project-card, .language-skills';

    function markSpotlights(scope) {
        scope.querySelectorAll(SPOT_SEL).forEach(el => el.classList.add('spotlight'));
    }
    markSpotlights(document);
    ['github-projects', 'github-starred'].forEach(id => {
        const box = document.getElementById(id);
        if (box) new MutationObserver(() => markSpotlights(box)).observe(box, { childList: true });
    });

    if (finePointer && !reduceMotion) {
        let current = null;

        function resetTilt(el) {
            el.classList.remove('tilting');
            el.style.transform = '';
        }

        document.addEventListener('pointermove', e => {
            const el = e.target.closest(TILT_SEL);
            if (current && current !== el) resetTilt(current);
            current = el;
            if (!el) return;

            const r   = el.getBoundingClientRect();
            const px  = (e.clientX - r.left) / r.width;
            const py  = (e.clientY - r.top) / r.height;
            const max = parseFloat(el.dataset.tiltMax) || 7;

            el.classList.add('tilting');
            el.style.transform =
                `perspective(1000px) rotateX(${(.5 - py) * max}deg) rotateY(${(px - .5) * max}deg) translateY(-6px)`;
            el.style.setProperty('--mx', `${px * 100}%`);
            el.style.setProperty('--my', `${py * 100}%`);
        }, { passive: true });

        document.addEventListener('pointerleave', () => { if (current) resetTilt(current); current = null; });
    }

    /* ------------------------------------------------------------
       MAGNETIC BUTTONS
       ------------------------------------------------------------ */
    if (finePointer && !reduceMotion) {
        document.querySelectorAll('.btn, .social-media a, .footer-iconTop a, .testimonial-navigation button').forEach(el => {
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * .25;
                const y = (e.clientY - r.top - r.height / 2) * .35;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });
    }

    /* ------------------------------------------------------------
       CURSOR GLOW
       ------------------------------------------------------------ */
    const glow = document.querySelector('.cursor-glow');
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, nx: 0, ny: 0 };

    window.addEventListener('pointermove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.nx = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.ny = (e.clientY / window.innerHeight) * 2 - 1;
        if (glow) glow.classList.add('active');
    }, { passive: true });

    if (glow && finePointer && !reduceMotion) {
        let gx = mouse.x, gy = mouse.y;
        (function follow() {
            gx += (mouse.x - gx) * .12;
            gy += (mouse.y - gy) * .12;
            glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
            requestAnimationFrame(follow);
        })();
    }

    /* ------------------------------------------------------------
       THREE.JS BACKGROUND
       Particle galaxy + wireframe icosahedron + orbit rings.
       Reacts to mouse (parallax) and scroll (rotation / drift).
       ------------------------------------------------------------ */
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || reduceMotion || typeof THREE === 'undefined') return;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
        console.warn('WebGL unavailable:', err);
        return;
    }

    const isSmall = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 100);
    camera.position.z = 9;

    // Round soft sprite for the particles
    function makeSprite() {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const g = c.getContext('2d');
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, 'rgba(255,255,255,1)');
        grd.addColorStop(.35, 'rgba(255,255,255,.6)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
    }
    const sprite = makeSprite();

    // --- Particle field ---
    const COUNT     = isSmall ? 900 : 2200;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const palette   = [new THREE.Color('#06b6d4'), new THREE.Color('#3b82f6'), new THREE.Color('#8b5cf6'), new THREE.Color('#ffffff')];

    for (let i = 0; i < COUNT; i++) {
        // Spiral-galaxy-ish distribution
        const radius = Math.pow(Math.random(), .7) * 16;
        const branch = (i % 3) / 3 * Math.PI * 2;
        const spin   = radius * .35;
        const rnd    = () => (Math.random() - .5) * (1.6 + radius * .18);
        positions[i * 3]     = Math.cos(branch + spin) * radius + rnd();
        positions[i * 3 + 1] = rnd() * .9;
        positions[i * 3 + 2] = Math.sin(branch + spin) * radius + rnd();

        const col = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
        size: .09, map: sprite, vertexColors: true, transparent: true,
        depthWrite: false, opacity: .9, sizeAttenuation: true,
    });
    const galaxy = new THREE.Points(particlesGeo, particlesMat);
    galaxy.rotation.x = .9;
    galaxy.position.y = -1;
    scene.add(galaxy);

    // --- Hero object: wireframe icosahedron + glowing vertices ---
    const hero = new THREE.Group();
    scene.add(hero);

    const icoGeo  = new THREE.IcosahedronGeometry(2.4, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: .35 });
    const ico     = new THREE.Mesh(icoGeo, wireMat);
    hero.add(ico);

    const coreMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: .25 });
    const core    = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), coreMat);
    hero.add(core);

    const nodesMat = new THREE.PointsMaterial({ size: .22, map: sprite, color: 0x67e8f9, transparent: true, depthWrite: false });
    const nodes    = new THREE.Points(icoGeo, nodesMat);
    hero.add(nodes);

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: .5 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: .45 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.4, .012, 8, 160), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.9, .01, 8, 160), ringMat2);
    ring1.rotation.x = Math.PI / 2.4;
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.y = .5;
    hero.add(ring1, ring2);

    function layoutHero() {
        const w = window.innerWidth;
        if (w >= 1050) {
            hero.position.set(3.6, .4, 0);
            hero.scale.setScalar(1.15);
        } else {
            hero.position.set(0, 1.4, -3);
            hero.scale.setScalar(1);
        }
    }
    layoutHero();

    // --- Theme-aware colors ---
    function applyTheme() {
        const dark = isDark();
        particlesMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        particlesMat.opacity  = dark ? .9 : .55;
        particlesMat.size     = dark ? .09 : .1;
        nodesMat.blending     = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        nodesMat.color.set(dark ? 0x67e8f9 : 0x0891b2);
        wireMat.color.set(dark ? 0x60a5fa : 0x2563eb);
        wireMat.opacity  = dark ? .35 : .28;
        coreMat.color.set(dark ? 0xa78bfa : 0x7c3aed);
        [particlesMat, nodesMat].forEach(m => { m.needsUpdate = true; });
    }
    applyTheme();
    new MutationObserver(applyTheme).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // --- Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        layoutHero();
    });

    // --- Animate (paused when the tab is hidden) ---
    const clock = new THREE.Clock();
    let camX = 0, camY = 0, smoothScroll = 0, smoothHero = 0, running = true;

    document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        if (running) { clock.getDelta(); requestAnimationFrame(render); }
    });

    function render() {
        if (!running) return;
        const t  = clock.getElapsedTime();
        smoothScroll += (scrollRatio - smoothScroll) * .06;
        smoothHero   += (heroRatio - smoothHero) * .08;

        // Mouse parallax on the camera
        camX += (mouse.nx * .8 - camX) * .04;
        camY += (-mouse.ny * .5 - camY) * .04;
        camera.position.x = camX;
        camera.position.y = camY - smoothScroll * 2;
        camera.lookAt(0, -smoothScroll * 2, 0);

        galaxy.rotation.y = t * .03 + smoothScroll * 2.5;

        ico.rotation.x  = t * .15 + smoothScroll * 4;
        ico.rotation.y  = t * .2;
        nodes.rotation.copy(ico.rotation);
        core.rotation.x = -t * .3;
        core.rotation.y = -t * .4;
        ring1.rotation.z = t * .25;
        ring2.rotation.z = -t * .18;

        // Breathing + fade/drift out as the user scrolls past the hero
        const breath = 1 + Math.sin(t * 1.4) * .03;
        hero.children.forEach(child => child.scale.setScalar(breath));
        const heroFade = Math.max(0, 1 - smoothHero * 1.1);
        hero.position.y = (window.innerWidth >= 1050 ? .4 : 1.4) + smoothHero * 3;
        wireMat.opacity  = (isDark() ? .35 : .28) * heroFade + .04;
        coreMat.opacity  = .25 * heroFade;
        ringMat1.opacity = .5 * heroFade;
        ringMat2.opacity = .45 * heroFade;
        nodesMat.opacity = heroFade;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(() => {
        render();
        canvas.classList.add('ready');
    });
})();
