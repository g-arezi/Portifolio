/**
 * Script para gerenciamento do tema escuro/claro
 * Por padrão, o site inicia no tema escuro
 */

// Função para salvar a preferência do usuário no localStorage
function saveThemePreference(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

// Função para carregar a preferência do usuário
function loadThemePreference() {
    // Se não existir preferência salva, retorna true (modo escuro) por padrão
    return localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true';
}

// Aplicar tema com base na preferência salva ou no padrão (escuro)
document.addEventListener('DOMContentLoaded', () => {
    const darkModeIcon = document.querySelector('#darkMode-icon');
    
    // Verificar se o elemento existe antes de prosseguir
    if (!darkModeIcon) {
        return;
    }
    
    // Verificar se há uma preferência salva
    const isDarkMode = loadThemePreference();
    
    // Sempre aplicar modo escuro por padrão, ou seguir a preferência se existir
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.add('bx-sun');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('bx-sun');
    }
    
    // Sobrescrever o evento onclick original para também salvar a preferência
    darkModeIcon.addEventListener('click', () => {
        // Verificar estado após o clique (depois que o script.js executa o toggle)
        setTimeout(() => {
            const isDarkModeActive = document.body.classList.contains('dark-mode');
            saveThemePreference(isDarkModeActive);
        }, 0);
    });
});
