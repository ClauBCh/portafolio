/**
 * Inicializa las animaciones para la secci n Sobre M .
 *
 * 1. Observa los elementos de la secci n Sobre M  y les agrega la clase
 *    "animate-fade-in-up" al intersectar con el viewport.
 * 2. Aplica un efecto de parallax suave para la imagen.
 * 3. Inicializa estilos para los skill tags.
 * 4. A ade la clase "cta-button" al bot n CTA.
 * 5. Agrega una animaci n de hover para los proyectos.
 * 6. A ade una animaci n de scroll para los proyectos.
 */
function initAnimations() {
  // IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    root: null, // Agregar un root si es necesario
  });

  // Observar elementos principales
  document.querySelectorAll('#sobre-mi .grid > div').forEach((el) => {
    observer.observe(el);
  });

  // Parallax
  const image = document.querySelector('#sobre-mi .glass img');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', debounce(() => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (image && window.innerWidth > 768) {
          image.style.transform = `translateY(${Math.min(lastScrollY * 0.05, 100)}px)`;
        }
        ticking = false;
      });

      ticking = true;
    }
  }, 100)); // Agregar un debounce

  // Efectos de hover
  document.querySelectorAll('.flex.flex-wrap.gap-2 span').forEach((tag) => {
    tag.classList.add('skill-tag');
  });

  // GSAP
  function setupProjectAnimations() {
    DOM.projects.forEach((project) => {
      // Hover animation
      project.addEventListener('mouseenter', () => {
        gsap.to(project, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      project.addEventListener('mouseleave', () => {
        gsap.to(project, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Scroll animation
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      });
    });
  }

  setupProjectAnimations();
}

// Initialize page animations
function initializeAnimations() {
  // IntersectionObserver for fade-in-up animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    root: null,
  });

  // Observe main elements in the #sobre-mi section
  document.querySelectorAll('#sobre-mi .grid > div').forEach((element) => {
    observer.observe(element);
  });

  // Parallax effect for image
  const image = document.querySelector('#sobre-mi .glass img');
  let lastScrollY = window.scrollY;
  let isTicking = false;

  window.addEventListener('scroll', debounce(() => {
    lastScrollY = window.scrollY;

    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (image && window.innerWidth > 768) {
          image.style.transform = `translateY(${Math.min(lastScrollY * 0.05, 100)}px)`;
        }
        isTicking = false;
      });

      isTicking = true;
    }
  }, 100));

  // Hover effects for skill tags
  document.querySelectorAll('.flex.flex-wrap.gap-2 span').forEach((tag) => {
    tag.classList.add('skill-tag');
  });

  // GSAP animations for projects
  function setupProjectAnimations() {
    DOM.projects.forEach((project) => {
      // Hover animation
      project.addEventListener('mouseenter', () => {
        gsap.to(project, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      project.addEventListener('mouseleave', () => {
        gsap.to(project, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Scroll animation
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      });
    });
  }

  setupProjectAnimations();
}

initializeAnimations();
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.error('GSAP no está cargado correctamente');
}
// Asegúrate de que GSAP esté incluido en tu página
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

// Constantes del DOM
const DOM = {
    header: document.querySelector('header'),
    sections: document.querySelectorAll('section'),
    form: document.getElementById('contactForm'),
    heroTitle: document.querySelector('.hero-title'),
    heroSubtitle: document.querySelector('.hero-subtitle'),
    heroCta: document.querySelector('.hero-cta'),
    projects: document.querySelectorAll('.proyecto'),
    navLinks: document.querySelectorAll('nav a[href^="#"]'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    mobileMenu: document.getElementById('mobile-menu'),
    loadingOverlay: document.getElementById('loading-overlay'),
    toastContainer: document.getElementById('toast-container'),
    sobreMiElements: {
        items: document.querySelectorAll('#sobre-mi li, #sobre-mi .flex-wrap span')
    }
};

// Configuración global
const CONFIG = {
    scrollOffset: 50,
    animationDuration: 1,
    notificationDuration: 3000,
    mobileBreakpoint: 768,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    recaptchaSiteKey: 'TU_CLAVE_DE_SITIO'
};

// Utilidades
const utils = {
    isValidEmail: (email) => CONFIG.emailRegex.test(email),

    showToast: (message, type = 'success') => {
        if (!message) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} opacity-0 transform translate-y-2`;
        toast.innerHTML = `
            <div class="flex items-center p-4 mb-4 rounded-lg bg-${type}-100 border-t-4 border-${type}-500">
                <div class="ml-3 text-sm font-medium text-${type}-700">
                    ${message}
                </div>
                <button type="button" class="ml-auto -mx-1.5 -my-1.5" aria-label="Cerrar">
                    <span class="sr-only">Cerrar</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                    </svg>
                </button>
            </div>
        `;

        DOM.toastContainer.appendChild(toast);
        gsap.to(toast, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });

        setTimeout(() => {
            gsap.to(toast, { opacity: 0, y: 2, duration: 0.3, ease: 'power2.in', onComplete: () => toast.remove() });
        }, CONFIG.notificationDuration);

        toast.querySelector('button').addEventListener('click', () => {
            gsap.to(toast, { opacity: 0, y: 2, duration: 0.3, ease: 'power2.in', onComplete: () => toast.remove() });
        });
    },

    toggleLoading: (isLoading) => {
        DOM.loadingOverlay.classList.toggle('hidden', !isLoading);
        DOM.loadingOverlay.classList.toggle('flex', isLoading);
    },

    /**
     * Cambia el estado de un botón de envío para mostrar un spinner y cambiar el texto.
     * @param {HTMLButtonElement} button - El botón que se va a modificar
     * @param {boolean} disabled - Si el botón debe estar deshabilitado
     * @param {string} [loadingText='Enviar'] - El texto que se mostrará mientras se carga
     */
    toggleButtonState: (button, disabled, loadingText = null) => {
        if (!button) return;
        
        button.disabled = disabled;
        const spinner = button.querySelector('.loading-spinner');
        const textSpan = button.querySelector('span:not(.loading-spinner)');
        
        if (spinner && textSpan) {
            spinner.classList.toggle('hidden', !disabled);
            textSpan.textContent = disabled && loadingText ? loadingText : button.dataset.originalText || 'Enviar';
        }
    }
};

// Animaciones
const animations = {
    /**
     * Inicializa las animaciones para el portafolio.
     * 
     * Se encarga de llamar a los métodos que configuran las animaciones para el
     * hero y para los elementos que se van a animar durante el scroll.
     */
    init: () => {
        animations.setupHeroAnimations();
        animations.setupScrollAnimations();
    },

    setupHeroAnimations: () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (DOM.heroTitle) timeline.fromTo(DOM.heroTitle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
        if (DOM.heroSubtitle) timeline.fromTo(DOM.heroSubtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
        if (DOM.heroCta) timeline.fromTo(DOM.heroCta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    },

/**
 * Configures scroll-triggered animations for each section.
 *
 * Applies a fade-in and upward movement animation to sections
 * when they enter the viewport. The animation is triggered
 * when the section's top reaches 80% of the viewport height
 * and ends when the bottom reaches 20%. The animation plays
 * forward on entry and reverses on exit with a smooth easing.
 */
    setupScrollAnimations: () => {
        DOM.sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
};

// Manejadores de eventos
const handlers = {
    /**
     * Toggles the "scrolled" class on the header element when the user scrolls
     * past the scroll offset.
     *
     * The scroll offset is defined in the CONFIG object and is currently set to 50.
     * This means that the "scrolled" class will be added to the header when the user
     * has scrolled past 50px from the top of the page, and removed when they scroll
     * back up to 50px from the top.
     *
     * The requestAnimationFrame function is used to throttle the scroll event,
     * so that the class is only toggled when the scroll position has changed.
     */
    handleScroll: () => {
        requestAnimationFrame(() => {
            const scrollPosition = window.scrollY;
            DOM.header?.classList.toggle('scrolled', scrollPosition > CONFIG.scrollOffset);
        });
    },

    /**
     * Smoothly scrolls to the target element when a nav link is clicked.
     *
     * Takes into account the height of the header element when calculating the
     * scroll position, so that the target element is positioned at the top of
     * the viewport.
     *
     * If the mobile menu is visible when the link is clicked, it is closed
     * after scrolling to the target element.
     * @param {Event} e - The event object passed from the nav link's click event.
     */
    handleSmoothScroll: (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = DOM.header?.offsetHeight || 0;
        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        if (DOM.mobileMenu?.classList.contains('show')) handlers.toggleMobileMenu();
    }
};

// Inicialización
const init = () => {
    window.addEventListener('scroll', handlers.handleScroll, { passive: true });
    DOM.navLinks.forEach(link => link.addEventListener('click', handlers.handleSmoothScroll));
    DOM.form?.addEventListener('submit', handlers.handleFormSubmit);
    DOM.mobileMenuButton?.addEventListener('click', handlers.toggleMobileMenu);
    animations.init();

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorScheme = (e) => document.documentElement.classList.toggle('dark', e.matches);
    prefersDarkScheme.addListener(handleColorScheme);
    handleColorScheme(prefersDarkScheme);
};

document.addEventListener('DOMContentLoaded', init);
