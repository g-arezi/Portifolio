/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
/*=====================================================*/
if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    
    // Desabilita o scroll quando o menu está aberto em dispositivos móveis
    if (window.innerWidth <= 768) {
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    };
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
/*=====================================================*/

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
};

/*========== remove menu icon navbar when click navbar link (scroll) ==========*/
if (navLinks && menuIcon && navbar) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}
/*=====================================================*/

/*========== swiper ==========*/
// Check if Swiper is available before initializing
let swiper;
if (typeof Swiper !== 'undefined') {
    try {
        swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
            },
        });
    } catch (error) {
        console.warn('Swiper initialization failed:', error);
    }
}

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

// Configuração básica do darkMode - a gestão avançada está em theme-mode.js
if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
    };
}
/*=====================================================*/

/*========== scroll reveal ==========*/
// Check if ScrollReveal is available before using
if (typeof ScrollReveal !== 'undefined') {
    try {
        ScrollReveal({
            // reset: true,
            distance: '80px',
            duration: 2000,
            delay: 200
        });
        /*=====================================================*/
        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
        ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
    } catch (error) {
        console.warn('ScrollReveal initialization failed:', error);
    }
}

// Adicionar funcionalidade aos botões de navegação
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');

if (prevButton && typeof swiper !== 'undefined') {
    prevButton.addEventListener('click', () => {
        swiper.slidePrev();
    });
}

if (nextButton && typeof swiper !== 'undefined') {
    nextButton.addEventListener('click', () => {
        swiper.slideNext();
    });
}

