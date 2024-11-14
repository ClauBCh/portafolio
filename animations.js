import { DOM } from './dom.js';

/**
 * Configura las animaciones para la sección Sobre Mí.
 *
 * 1. Observa los elementos de la sección Sobre Mí y les agrega la clase
 *    "animate-fade-in-up" al intersectar con el viewport.
 * 2. Aplica un efecto de parallax suave para la imagen.
 * 3. Inicializa estilos para los skill tags.
 * 4. Añade la clase "cta-button" al botón CTA.
 */
export const setupAnimations = () => {
    // Configurar observador de intersección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos de la sección Sobre Mí
    if (DOM.sobreMi.container) {
        document.querySelectorAll('#sobre-mi .grid > div').forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax suave para la imagen
    let lastScrollY = window.scrollY;
    let ticking = false;

    if (DOM.sobreMi.image) {
        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.innerWidth > 768) {
                        DOM.sobreMi.image.style.transform = `translateY(${lastScrollY * 0.05}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Inicializar estilos para los skill tags
    DOM.sobreMi.skillTags?.forEach(tag => {
        tag.classList.add('skill-tag');
    });

    // Añadir clase al botón CTA
    DOM.sobreMi.ctaButton?.classList.add('cta-button');
};
