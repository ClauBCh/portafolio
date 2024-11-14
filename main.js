import { DOM } from './modules/dom.js';
import { setupAnimations } from './modules/animations.js';
import { utils } from './modules/utils.js';
import { CONFIG } from './config.js';

// Verificar GSAP
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.error('GSAP no está cargado correctamente');
}

// DOM Elements
const DOM = {
    sobreMi: {
        container: document.querySelector('#sobre-mi'),
        image: document.querySelector('#sobre-mi .glass img'),
        skillTags: document.querySelectorAll('.skill-tag'),
        ctaButton: document.querySelector('#sobre-mi a[href="#contacto"]')
    },
    mobileMenu: {
        button: document.querySelector('#mobile-menu-button'),
        container: document.querySelector('#mobile-menu')
    },
    header: document.querySelector('header'),
    navLinks: document.querySelectorAll('nav a[href^="#"]')
};

// Inicialización
const init = () => {
    setupAnimations();
    initAnimations();

    // Scroll event for header
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollPosition = window.scrollY;
            DOM.header?.classList.toggle('scrolled', scrollPosition > CONFIG.scrollOffset);
        });
    }, { passive: true });

    // Smooth navigation
    DOM.navLinks?.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            if (targetId) {
                utils.scrollToSection(targetId);
            }
        });
    });

    // Mobile menu toggle
    DOM.mobileMenu.button?.addEventListener('click', () => {
        const isOpen = DOM.mobileMenu.container.classList.contains('show');
        DOM.mobileMenu.container.classList.toggle('show');
        DOM.mobileMenu.button.setAttribute('aria-expanded', String(!isOpen));
    });
};

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    if (DOM.sobreMi.container) {
        const elementsToAnimate = DOM.sobreMi.container.querySelectorAll('.grid > div');
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    DOM.sobreMi.skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        observer.observe(tag);
    });
}

// Parallax effect for image
function setupParallaxEffect() {
    if (!DOM.sobreMi.image) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
        if (window.innerWidth <= 768) return;

        const translateY = lastScrollY * 0.05;
        DOM.sobreMi.image.style.transform = `translateY(${translateY}px)`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Mobile menu animations
function setupMobileMenu() {
    if (!DOM.mobileMenu.button || !DOM.mobileMenu.container) return;

    const menu = DOM.mobileMenu.container;
    const button = DOM.mobileMenu.button;

    button.addEventListener('click', () => {
        const isOpen = menu.classList.contains('show');
        button.setAttribute('aria-expanded', (!isOpen).toString());

        if (isOpen) {
            gsap.to(menu, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => menu.classList.remove('show')
            });
        } else {
            menu.classList.add('show');
            gsap.fromTo(menu, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });
}

// Initialize animations
function initAnimations() {
    setupScrollAnimations();
    setupParallaxEffect();
    setupMobileMenu();
    DOM.sobreMi.ctaButton?.classList.add('cta-button');
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Generar y enviar el token de reCAPTCHA antes de enviar el formulario
grecaptcha.ready(function() {
    grecaptcha.execute(CONFIG.recaptchaSiteKey, {action: 'submit'}).then(function(token) {
        document.getElementById('recaptchaToken').value = token;
    });
});
