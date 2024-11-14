export const DOM = {
    header: document.querySelector('header'),
    sections: document.querySelectorAll('section'),
    form: document.getElementById('contactForm'),
    sobreMi: {
        section: document.querySelector('#sobre-mi'),
        image: document.querySelector('#sobre-mi .glass img'),
        skillTags: document.querySelectorAll('.flex.flex-wrap.gap-2 span'),
        ctaButton: document.querySelector('#sobre-mi a[href="#contacto"]')
    },
    navLinks: document.querySelectorAll('nav a[href^="#"]'),
    mobileMenu: {
        button: document.getElementById('mobile-menu-button'),
        container: document.getElementById('mobile-menu')
    },
    loadingOverlay: document.getElementById('loading-overlay'),
    toastContainer: document.getElementById('toast-container')
};
const DOM = {
  navLinks: document.querySelectorAll('.nav-link'),
  form: document.querySelector('.form'),
  mobileMenuButton: document.querySelector('.mobile-menu-button')
};