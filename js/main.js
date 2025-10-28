// Funcionalidad del menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace (móvil)
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Animación suave de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de conteo de números en estadísticas
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Usar Intersection Observer para animar cuando se vea la sección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    // Agregar clase para animación CSS
                    stat.classList.add('counting');

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 16); // ~60fps
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Buscar secciones que contengan estadísticas
    const aboutSection = document.querySelector('#trayectoria');
    const nosotrosSection = document.querySelector('#nosotros');

    if (aboutSection) {
        observer.observe(aboutSection);
    } else if (nosotrosSection) {
        observer.observe(nosotrosSection);
    }
}

// Inicializar contadores cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}


// Animación de entrada del hero-content con Anime.js - profesional y suave
function initHeroContentAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    // Crear timeline maestro para toda la secuencia de entrada
    const contentTimeline = anime.timeline({
        delay: 250
    });

    // === ENTRADA: TÍTULO CON FADE + SLIDE ===
    if (heroTitle) {
        contentTimeline.add({
            targets: heroTitle,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            easing: 'easeOutCubic'
        }, 0);
    }

    // === ENTRADA: DESCRIPCIÓN CON DELAY CASCADA ===
    if (heroDescription) {
        contentTimeline.add({
            targets: heroDescription,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutCubic'
        }, 200);
    }

    // === ENTRADA: BOTONES CON STAGGER Y ESCALA ===
    if (heroButtons) {
        const buttons = heroButtons.querySelectorAll('.btn');

        contentTimeline.add({
            targets: buttons,
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.95, 1],
            duration: 700,
            easing: 'easeOutCubic',
            delay: anime.stagger(120, { start: 0 })
        }, 400);

        // === ANIMACIÓN PASIVA: HOVER SUAVE EN BOTONES ===
        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(105, 36, 124, 0.25)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    boxShadow: '0 0px 0px rgba(105, 36, 124, 0)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
}

// Animación de hover en tarjetas de servicios
function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime.set(card, {
                zIndex: 10
            });

            anime({
                targets: card,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(138, 43, 226, 0.4)',
                translateY: -10,
                duration: 400,
                easing: 'easeOutQuad'
            });

            // Animar el ícono
            const icon = card.querySelector('i');
            if (icon) {
                anime({
                    targets: icon,
                    scale: 1.2,
                    rotate: 10,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                translateY: 0,
                duration: 400,
                easing: 'easeOutQuad'
            });

            // Resetear ícono
            const icon = card.querySelector('i');
            if (icon) {
                anime({
                    targets: icon,
                    scale: 1,
                    rotate: 0,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
}

// Glassmorphism en navbar al hacer scroll
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Detectar zoom del navegador y ajustar tamaños dinámicamente
function detectZoomAndAdjustContent() {
    // Función para obtener el nivel de zoom del navegador
    function getZoomLevel() {
        return window.devicePixelRatio || 1;
    }

    // Función para ajustar todos los elementos según el zoom
    function adjustContentForZoom() {
        const zoomLevel = getZoomLevel();

        // Solo ajustar si el zoom es mayor a 1 (zoomed in)
        if (zoomLevel > 1) {
            // Calcular el factor de escala inverso más agresivo
            // Si zoom es 1.25 (125%), queremos al 60% (1/1.25 - 0.2 adicional)
            const scaleFactor = (1 / zoomLevel) * 0.75;

            // Aplicar la solución a elementos críticos
            const mobileLogoImg = document.querySelector('.mobile-logo img');

            // Reducir tamaño SOLO del logo/icon
            if (mobileLogoImg) {
                mobileLogoImg.style.height = Math.max(150, 400 * scaleFactor) + 'px';
            }
        } else {
            // Restablecer estilos si zoom es normal
            const mobileLogoImg = document.querySelector('.mobile-logo img');

            if (mobileLogoImg) {
                mobileLogoImg.style.height = '400px';
            }
        }
    }

    // Ajustar al cargar
    adjustContentForZoom();

    // Escuchar cambios de resize (que incluye cambios de zoom en muchos navegadores)
    window.addEventListener('resize', adjustContentForZoom);

    // Verificar periódicamente cambios de zoom
    let lastZoom = getZoomLevel();
    setInterval(() => {
        const currentZoom = getZoomLevel();
        if (Math.abs(currentZoom - lastZoom) > 0.01) {
            lastZoom = currentZoom;
            adjustContentForZoom();
        }
    }, 300);
}

// Inicializar todas las animaciones cuando el DOM esté listo
function initAllAnimations() {
    detectZoomAndAdjustContent();
    initHeroContentAnimation();
    initServiceCardsAnimation();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

