import { DOM } from './dom.js';
import { CONFIG } from '../config.js';

export const utils = {
    /**
     * Muestra un toast notificando un mensaje.
     * 
     * @param {string} message - El mensaje a mostrar
     * @param {string} [type='success'] - El tipo de notificación (success, error, warning)
     * 
     * El toast se crea dinámicamente y se agrega al contenedor
     * de toasts en el DOM. La animación de aparición y desaparición
     * se logra mediante GSAP.
     * 
     * La duración de la notificación se configura en la constante
     * de configuración CONFIG.notificationDuration.
     */
    showToast(message, type = 'success') {
        if (!message || !DOM.toastContainer) return;

        const toast = document.createElement('div');
        // Clase para el tipo de notificación
        toast.className = `toast toast-${type} opacity-0 transform translate-y-2`;

        // Contenido del toast
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
        
        // Animación y auto-cierre
        gsap.to(toast, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(toast, {
                opacity: 0,
                y: 2,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => toast.remove()
            });
        }, CONFIG.notificationDuration);
    },

    /**
     * Toggles the visibility of the loading overlay.
     * 
     * @param {boolean} isLoading - Determines if the loading overlay should be visible.
     *                              If true, the overlay is shown; if false, it is hidden.
     */
    toggleLoading(isLoading) {
        /**
         * Toggles the visibility of the loading overlay.
         * 
         * @param {boolean} isLoading - Determines if the loading overlay should be visible.
         *                              If true, the overlay is shown; if false, it is hidden.
         */
        if (DOM.loadingOverlay) {
            DOM.loadingOverlay.classList.toggle('hidden', !isLoading);
            DOM.loadingOverlay.classList.toggle('flex', isLoading);
        }
    },

    /**
     * Scrolls to the given section id
     * @param {string} targetId - The id of the section to scroll to
     * @description
     * Calculates the position of the target element and scrolls to it, taking into account
     * the position of the header.
     */
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const headerOffset = DOM.header?.offsetHeight || 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};
