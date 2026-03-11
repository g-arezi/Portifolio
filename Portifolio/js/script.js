/* ============================================================
   NAVIGATION – Menu toggle
   ============================================================ */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x', isOpen);
        menuIcon.setAttribute('aria-expanded', String(isOpen));

        if (window.innerWidth <= 768) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });
}

/* ============================================================
   NAVIGATION – Close menu on link click
   ============================================================ */
const navLinks = document.querySelectorAll('header nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon) menuIcon.classList.remove('bx-x');
        if (navbar)   navbar.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ============================================================
   NAVIGATION – Active link on scroll + sticky header
   ============================================================ */
const sections = document.querySelectorAll('section');
const header   = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header
    if (header) {
        header.classList.toggle('sticky', scrollY > 100);
    }

    // Active nav link
    sections.forEach(section => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

/* ============================================================
   SWIPER – Testimonials
   ============================================================ */
let swiper;

if (typeof Swiper !== 'undefined') {
    try {
        swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
        });
    } catch (err) {
        console.warn('Swiper initialization failed:', err);
    }
}

const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

if (prevBtn && swiper) prevBtn.addEventListener('click', () => swiper.slidePrev());
if (nextBtn && swiper) nextBtn.addEventListener('click', () => swiper.slideNext());

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
if (typeof ScrollReveal !== 'undefined') {
    try {
        ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
        ScrollReveal().reveal('.home-content, .heading',                                            { origin: 'top' });
        ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img img',                                   { origin: 'left' });
        ScrollReveal().reveal('.home-content h3, .home-content p, .about-content',                 { origin: 'right' });
    } catch (err) {
        console.warn('ScrollReveal initialization failed:', err);
    }
}

/* ============================================================
   GITHUB PROJECTS
   ============================================================ */
(function loadGithubProjects() {
    const GITHUB_USER = 'g-arezi';
    const container   = document.getElementById('github-projects');

    if (!container) return;

    const LANG_ICONS = {
        JavaScript:      '<i class="fab fa-js-square"  style="color:#f7df1e"></i>',
        TypeScript:      '<i class="fab fa-js"         style="color:#3178c6"></i>',
        HTML:            '<i class="fab fa-html5"      style="color:#e34c26"></i>',
        CSS:             '<i class="fab fa-css3-alt"   style="color:#264de4"></i>',
        Python:          '<i class="fab fa-python"     style="color:#3572A5"></i>',
        'C#':            '<i class="fas fa-code"       style="color:#68217a"></i>',
        'C++':           '<i class="fas fa-code"       style="color:#00599C"></i>',
        PHP:             '<i class="fab fa-php"        style="color:#777bb4"></i>',
        Java:            '<i class="fab fa-java"       style="color:#b07219"></i>',
        Shell:           '<i class="fas fa-terminal"   style="color:#89e051"></i>',
        Go:              '<i class="fab fa-golang"     style="color:#00ADD8"></i>',
        Vue:             '<i class="fab fa-vuejs"      style="color:#42b883"></i>',
        React:           '<i class="fab fa-react"      style="color:#61dafb"></i>',
        Dockerfile:      '<i class="fab fa-docker"     style="color:#2496ed"></i>',
        'Jupyter Notebook': '<i class="fas fa-book"   style="color:#f37626"></i>',
        Kotlin:          '<i class="fab fa-java"       style="color:#0095D5"></i>',
        Ruby:            '<i class="fab fa-gem"        style="color:#701516"></i>',
        Swift:           '<i class="fab fa-swift"      style="color:#ffac45"></i>',
        Rust:            '<i class="fas fa-cog"        style="color:#000000"></i>',
        Markdown:        '<i class="fas fa-file-alt"   style="color:#000000"></i>',
        'N/A':           '<i class="fas fa-question-circle" style="color:#888"></i>',
    };

    function getIcon(lang) {
        return LANG_ICONS[lang] || LANG_ICONS['N/A'];
    }

    function buildCard(repo) {
        const lang       = repo.language || 'N/A';
        const isFeatured = repo.stargazers_count >= 10;
        const updatedAt  = new Date(repo.updated_at).toLocaleDateString('pt-BR');

        return `
            <div class="project-card${isFeatured ? ' featured' : ''}">
                <div class="project-lang">${getIcon(lang)} ${lang}</div>
                <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                <div class="project-meta">
                    <span class="date">Atualizado: ${updatedAt}</span>
                </div>
                <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
            </div>
        `;
    }

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(repos => {
            if (!Array.isArray(repos) || repos.length === 0) {
                container.innerHTML = '<p>Nenhum projeto encontrado.</p>';
                return;
            }

            repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            container.innerHTML = repos.map(buildCard).join('');
        })
        .catch(() => {
            container.innerHTML = '<p>Erro ao carregar projetos do GitHub.</p>';
        });
})();
