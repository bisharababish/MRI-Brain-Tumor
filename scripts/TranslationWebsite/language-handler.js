function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
        setLanguagePreference(langParam);
        return langParam;
    }
    return localStorage.getItem('preferredLanguage') || 'en';
}

function setLanguagePreference(language) {
    localStorage.setItem('preferredLanguage', language);
}

function updateLanguageLinks() {
    const lang = getCurrentLanguage();
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.href.includes('lang=')) {
            const separator = link.href.includes('?') ? '&' : '?';
            link.href = `${link.href}${separator}lang=${lang}`;
        }
    });
}

function initializeLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    const currentLanguage = getCurrentLanguage();
    languageToggle.checked = currentLanguage === 'ar';
    document.getElementById('lang-label').textContent = currentLanguage === 'ar' ? 'AR' : 'EN';
    document.body.classList.toggle('arabic', currentLanguage === 'ar');
    toggleLanguage();
    updateLanguageLinks();
}

function toggleLanguage() {
    const isArabic = document.getElementById('language-toggle').checked;
    const lang = isArabic ? 'ar' : 'en';
    setLanguagePreference(lang);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    initializeLanguageToggle();
}

document.addEventListener('DOMContentLoaded', initializeLanguageToggle);
document.getElementById('language-toggle').addEventListener('change', toggleLanguage);
