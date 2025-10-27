/* ========================================
   NOVA - MASCOTA VIRTUAL INTERACTIVA
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNova();
});

/**
 * Inicializar todas las funcionalidades de Nova
 */
function initializeNova() {
    initializeProgressBar();
}

/**
 * Inicializar la barra de progreso con animación
 */
function initializeProgressBar() {
    const progressBars = document.querySelectorAll('.igamified-progress-bar');

    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';

        // Trigger animation
        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = width;
        }, 100);
    });
}

/**
 * Actualizar el progreso de Nova
 * @param {number} newProgress - Nuevo porcentaje de progreso (0-100)
 */
function updateNovaProgress(newProgress) {
    const progressBar = document.querySelector('.igamified-progress-bar');
    const progressText = document.querySelector('.igamified-progress-text');

    if (progressBar && progressText) {
        progressBar.style.width = newProgress + '%';
        progressText.textContent = newProgress + '%';
    }
}

/**
 * Cambiar el avatar de Nova
 * @param {string} imagePath - Ruta de la nueva imagen
 */
function changeNovaAvatar(imagePath) {
    const avatar = document.querySelector('.igamified-avatar');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            avatar.src = imagePath;
            avatar.style.opacity = '1';
        }, 300);
    }
}

/**
 * Cambiar el nivel/badge de Nova
 * @param {string} newLevel - Nuevo nivel (ej: "Principiante", "Intermedio", "Avanzado")
 */
function changeNovaLevel(newLevel) {
    const badge = document.querySelector('.igamified-badge');
    if (badge) {
        badge.textContent = newLevel;
    }
}

/**
 * Activar/desactivar bonificación diaria
 * @param {boolean} isActive - Si la bonificación está activa
 */
function toggleDailyBonus(isActive) {
    const bonusMarker = document.querySelector('.igamified-bonus-marker');
    if (bonusMarker) {
        if (isActive) {
            bonusMarker.textContent = 'x2.0';
            bonusMarker.classList.remove('igamified-bonus-inactive');
            bonusMarker.classList.add('igamified-bonus-active');
        } else {
            bonusMarker.textContent = 'x1.0';
            bonusMarker.classList.remove('igamified-bonus-active');
            bonusMarker.classList.add('igamified-bonus-inactive');
        }
    }
}

/**
 * Obtener la barra de progreso actual de Nova
 * @returns {number} Porcentaje actual de progreso
 */
function getNovaProgress() {
    const progressBar = document.querySelector('.igamified-progress-bar');
    if (progressBar) {
        const width = progressBar.style.width;
        return parseInt(width);
    }
    return 0;
}

/**
 * Obtener el nivel actual de Nova
 * @returns {string} Nivel actual
 */
function getNovaLevel() {
    const badge = document.querySelector('.igamified-badge');
    if (badge) {
        return badge.textContent;
    }
    return 'Desconocido';
}

// Exportar funciones para uso global
window.Nova = {
    updateProgress: updateNovaProgress,
    changeAvatar: changeNovaAvatar,
    changeLevel: changeNovaLevel,
    toggleBonus: toggleDailyBonus,
    getProgress: getNovaProgress,
    getLevel: getNovaLevel
};
