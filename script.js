// ==========================================
// CONFIGURACIÓN: Reemplaza este enlace con tu Google Form
// ==========================================
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSckI1iQuFIiNF3jQH8qpzG58f8DNK_nbSc-zHdxL666zYVsvw/viewform';
const WHATSAPP_URL = 'https://wa.me/584241361642?text=Datos%20de%20Pago%20Movil';
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const successOverlay = document.getElementById('success-overlay');
    const finishBtn = document.getElementById('finish-btn');
    
    // Modals
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-close-btn-bottom');
    const modals = document.querySelectorAll('.modal-box');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isModalOpen = false;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'past');
            if (index < currentSlide) {
                slide.classList.add('past');
            } else if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        const progressPercentage = (currentSlide / (totalSlides - 1)) * 100;
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }

        prevBtn.disabled = currentSlide === 0;
        
        if (currentSlide === totalSlides - 1) {
            nextBtn.textContent = 'FINALIZAR';
            nextBtn.classList.add('bounce-anim');
        } else {
            nextBtn.textContent = 'CONTINUAR';
            nextBtn.classList.remove('bounce-anim');
        }
    }

    updateSlides();

    prevBtn.addEventListener('click', () => {
        if (isModalOpen) return;
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides('backward');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (isModalOpen) return;
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides('forward');
        } else if (currentSlide === totalSlides - 1) {
            if (successOverlay) {
                successOverlay.classList.add('show');
                const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg');
                audio.play().catch(e => console.log('Audio autoplay prevented'));
            }
        }
    });

    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            // Abre la URL configurada arriba
            // Abre WhatsApp para el pago
            window.open(WHATSAPP_URL, '_blank');
            
            // Cierra el overlay por si vuelven a la pestaña
            successOverlay.classList.remove('show');
            currentSlide = 0;
            updateSlides();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isModalOpen) return;
        if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === 'Space') {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlides('forward');
            } else if (currentSlide === totalSlides - 1 && !successOverlay.classList.contains('show')) {
                successOverlay.classList.add('show');
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlides('backward');
            }
        }
    });

    // Touch swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        if (isModalOpen) return;
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        if (isModalOpen) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; 
        if (touchEndX < touchStartX - swipeThreshold) {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlides('forward');
            }
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlides('backward');
            }
        }
    }

    // Modal Logic
    function openModal(modalId) {
        isModalOpen = true;
        modalOverlay.classList.add('active');
        
        modals.forEach(modal => {
            modal.classList.remove('active', 'slide-up');
            if (modal.id === modalId) {
                modal.classList.add('active');
                setTimeout(() => {
                    modal.classList.add('slide-up');
                }, 10);
            }
        });
    }

    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('slide-up');
        });
        setTimeout(() => {
            modalOverlay.classList.remove('active');
            modals.forEach(modal => modal.classList.remove('active'));
            isModalOpen = false;
        }, 300); // Wait for transition
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetId = this.getAttribute('data-modal-target');
            if (targetId) openModal(targetId);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Custom Niche Submit Logic
    const btnSubmitNicho = document.getElementById('btn-submit-nicho');
    const nichoInput = document.getElementById('nicho-input');

    if (btnSubmitNicho && nichoInput) {
        btnSubmitNicho.addEventListener('click', () => {
            const nichoValue = nichoInput.value.trim();
            if (nichoValue === "") {
                alert("Por favor, escribe de qué tratará tu proyecto antes de enviar.");
                nichoInput.focus();
                return;
            }
            
            // Abre la URL configurada arriba
            // Abre WhatsApp para el pago
            window.open(WHATSAPP_URL, '_blank');
            closeModal();
            
            // Opcional: mostrar la pantalla de éxito después de inscribirse
            if (successOverlay) {
                successOverlay.classList.add('show');
                const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg');
                audio.play().catch(e => console.log('Audio autoplay prevented'));
            }
        });
    }

    // Dual Buttons Logic (Inscribirse / Contactanos)
    const btnNichoInscribirse = document.getElementById('btn-nicho-inscribirse');
    const btnNichoContactanos = document.getElementById('btn-nicho-contactanos');
    const btnSuccessInscribirse = document.getElementById('btn-success-inscribirse');
    const btnSuccessContactanos = document.getElementById('btn-success-contactanos');

    const handleInscribirse = () => {
        window.open(GOOGLE_FORM_URL, '_blank');
        if (isModalOpen) closeModal();
    };

    const handleContactanos = () => {
        window.open(WHATSAPP_URL, '_blank');
        if (isModalOpen) closeModal();
    };

    if (btnNichoInscribirse) btnNichoInscribirse.addEventListener('click', handleInscribirse);
    if (btnNichoContactanos) btnNichoContactanos.addEventListener('click', handleContactanos);
    if (btnSuccessInscribirse) btnSuccessInscribirse.addEventListener('click', handleInscribirse);
    if (btnSuccessContactanos) btnSuccessContactanos.addEventListener('click', handleContactanos);
});
