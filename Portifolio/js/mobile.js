/**
 * Script específico para melhorar a experiência em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detecta se é um dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Forçar recálculo de altura em dispositivos móveis para resolver problemas de layout
    if (isMobile) {
        const setMobileHeight = () => {
            // Define a altura da viewport para páginas responsivas
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Ajusta a altura da seção home para garantir que caiba na tela
            const homeSection = document.querySelector('.home');
            if (homeSection) {
                homeSection.style.minHeight = `calc(100vh - 7rem)`;
            }
        };
        
        // Chama a função imediatamente e quando a janela for redimensionada
        setMobileHeight();
        window.addEventListener('resize', setMobileHeight);
        
        // Garantir que o menu possa ser fechado ao clicar em qualquer lugar fora dele
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            const menuIcon = document.querySelector('#menu-icon');
            
            if (navbar && menuIcon && navbar.classList.contains('active') && 
                !navbar.contains(event.target) && 
                event.target !== menuIcon) {
                menuIcon.click();
            }
        });
        // Adiciona classe específica para mobile no body
        document.body.classList.add('is-mobile-device');
        
        // Melhora o comportamento de touch nos links
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            link.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
        
        // Otimiza o comportamento de scroll
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        if (header) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Esconde/mostra o header baseado na direção do scroll
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scroll para baixo
                    header.classList.add('header-hidden');
                } else {
                    // Scroll para cima
                    header.classList.remove('header-hidden');
                }
                
                lastScrollTop = scrollTop;
            }, { passive: true });
        }
        
        // Adiciona suporte a gestos de swipe para o slider de recomendações
        const testimonialSlider = document.querySelector('.testimonial-box');
        
        if (testimonialSlider) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            testimonialSlider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            testimonialSlider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                // Detecta a direção do swipe e navega pelo slider
                const nextButton = document.querySelector('.testimonial-next');
                const prevButton = document.querySelector('.testimonial-prev');
                
                if (touchEndX < touchStartX - 50 && nextButton) {
                    // Swipe para a esquerda
                    nextButton.click();
                }
                
                if (touchEndX > touchStartX + 50 && prevButton) {
                    // Swipe para a direita
                    prevButton.click();
                }
            }
        }
        
        // Otimiza o carregamento de imagens em dispositivos móveis
        const lazyLoadImages = document.querySelectorAll('img[data-src]');
        if (lazyLoadImages.length > 0) {
            const lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        lazyLoadObserver.unobserve(img);
                    }
                });
            });
            
            lazyLoadImages.forEach(img => {
                lazyLoadObserver.observe(img);
            });
        }
    }
});
