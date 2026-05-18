// ==========================================
// CONFIGURACIÓN: Reemplaza este enlace con tu Google Form
// ==========================================
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSckI1iQuFIiNF3jQH8qpzG58f8DNK_nbSc-zHdxL666zYVsvw/viewform';
const WHATSAPP_URL = 'https://wa.me/584241361642?text=%C2%A1Hola%21%20%F0%9F%91%8B%20Qu%C3%A9%20alegr%C3%ADa%20que%20quieras%20sumarte%20al%20Taller%20de%20IA%20para%20Celular.%20%F0%9F%93%B1%E2%9C%A8%20Un%20espacio%20100%25%20pr%C3%A1ctico%20para%20aprender%20a%20usar%20estas%20herramientas%20a%20tu%20favor%20desde%20el%20tel%C3%A9fono.%0A%0A%F0%9F%93%8D%20Coordenadas%3A%0A%0ACu%C3%A1ndo%3A%20S%C3%A1bado%2013%20de%20Junio%2C%209%3A00%20AM.%0A%0AD%C3%B3nde%3A%20Sede%20de%20Acacentro%2C%20La%20California%20Norte%20%28Presencial%29.%0A%0A%F0%9F%92%B0%20Inversi%C3%B3n%3A%2020%24%20%28o%20en%20Bs.%20a%20tasa%20BCV%29.%0A%0A%F0%9F%8C%9F%20Asegura%20tu%20cupo%20aqu%C3%AD%0APuedes%20realizar%20el%20aporte%20a%20trav%C3%A9s%20de%20Pago%20M%C3%B3vil%3A%0A%0ABanco%3A%20Mercantil%0A%0AC%C3%A9dula%3A%20V-4.011.071%0A%0ATel%C3%A9fono%3A%200424-1361642%0A%0A%F0%9F%93%A5%20Para%20finalizar%3A%20Al%20pagar%2C%20reenv%C3%ADame%20por%20aqu%C3%AD%20tu%20nombre%20completo%20y%20la%20captura%20del%20comprobante.%0A%0A%C2%A1Te%20confirmo%20de%20una%20vez%20y%20guardamos%20tu%20puesto%21%20Qu%C3%A9%20nota%20que%20te%20sumes.%20%F0%9F%9A%80';
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
