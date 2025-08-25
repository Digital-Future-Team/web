document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Fix for collapse buttons in departments page
    const showMoreButtons = document.querySelectorAll('.show-more-btn, [data-bs-toggle="collapse"]');
    if (showMoreButtons.length > 0) {
        showMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-bs-target');
                const target = document.querySelector(targetId);
                if (target) {
                    if (target.classList.contains('show')) {
                        // Collapse is open, close it
                        const bsCollapse = bootstrap.Collapse.getInstance(target);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                        // Update button text
                        const arText = this.querySelector('.lang-ar');
                        const enText = this.querySelector('.lang-en');
                        if (arText) arText.textContent = 'عرض المزيد';
                        if (enText) enText.textContent = 'Show More';
                    } else {
                        // Collapse is closed, open it
                        new bootstrap.Collapse(target);
                        // Update button text
                        const arText = this.querySelector('.lang-ar');
                        const enText = this.querySelector('.lang-en');
                        if (arText) arText.textContent = 'عرض أقل';
                        if (enText) enText.textContent = 'Show Less';
                    }
                }
            });
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    const htmlElement = document.documentElement;
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // Toggle language classes
            document.querySelectorAll('.lang-ar, .lang-en').forEach(el => {
                el.classList.toggle('hidden');
            });
            
            // Toggle HTML direction attribute
            if (htmlElement.getAttribute('dir') === 'rtl') {
                htmlElement.setAttribute('dir', 'ltr');
                htmlElement.setAttribute('lang', 'en');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                htmlElement.setAttribute('lang', 'ar');
            }
            
            // Toggle direction stylesheet
            const directionStyle = document.getElementById('direction-style');
            if (directionStyle) {
                if (directionStyle.getAttribute('href') === 'css/rtl.css') {
                    directionStyle.setAttribute('href', 'css/ltr.css');
                } else {
                    directionStyle.setAttribute('href', 'css/rtl.css');
                }
            }
            
            // Save language preference
            const currentLang = htmlElement.getAttribute('lang');
            localStorage.setItem('preferredLanguage', currentLang);
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle dark class on html element
            document.documentElement.classList.toggle('dark');
            
            // Toggle theme stylesheet
            const themeStyle = document.getElementById('theme-style');
            if (themeStyle) {
                const currentPath = themeStyle.getAttribute('href');
                const isRootPath = !currentPath.includes('/');
                const cssPrefix = isRootPath ? 'css/' : '../css/';
                
                if (currentPath.includes('light-theme.css')) {
                    themeStyle.setAttribute('href', cssPrefix + 'dark-theme.css');
                } else {
                    themeStyle.setAttribute('href', cssPrefix + 'light-theme.css');
                }
            }
            
            // Toggle logo visibility
            const lightLogo = document.querySelector('.navbar-brand img.light-logo');
            const darkLogo = document.querySelector('.navbar-brand img.dark-logo');
            
            if (lightLogo && darkLogo) {
                lightLogo.classList.toggle('hidden');
                darkLogo.classList.toggle('hidden');
            }
            
            // Save theme preference
            const isDarkMode = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
        });
    }

    // Apply saved preferences on page load
    function applyUserPreferences() {
        // Apply language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            if ((savedLang === 'en' && htmlElement.getAttribute('lang') === 'ar') ||
                (savedLang === 'ar' && htmlElement.getAttribute('lang') === 'en')) {
                // Trigger language toggle if current language doesn't match saved preference
                if (languageToggle) {
                    languageToggle.click();
                }
            }
        }
        
        // Apply theme preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            const isDarkMode = savedDarkMode === 'true';
            const currentIsDarkMode = document.documentElement.classList.contains('dark');
            
            if (isDarkMode !== currentIsDarkMode) {
                // Trigger theme toggle if current theme doesn't match saved preference
                if (themeToggle) {
                    themeToggle.click();
                }
            }
        }
        
        // Set correct logo visibility based on theme
        const isDarkMode = document.documentElement.classList.contains('dark');
        const lightLogo = document.querySelector('.navbar-brand img.light-logo');
        const darkLogo = document.querySelector('.navbar-brand img.dark-logo');
        
        if (lightLogo && darkLogo) {
            lightLogo.classList.toggle('hidden', isDarkMode);
            darkLogo.classList.toggle('hidden', !isDarkMode);
        }
    }
    
    // Apply user preferences after a short delay to avoid flash of incorrect theme/language
    setTimeout(applyUserPreferences, 100);

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const options = {
            threshold: 0.8
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = 2000 / target; // Adjust speed based on target value
                    
                    const updateCount = () => {
                        if (count < target) {
                            count++;
                            counter.innerText = count;
                            setTimeout(updateCount, speed);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                    observer.unobserve(counter); // Only animate once
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
});