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

    // Mobile sidebar functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar');
    
    // Create overlay for mobile sidebar
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
    
    // Open mobile sidebar
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            if (mobileSidebar) {
                mobileSidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close mobile sidebar
    function closeMobileSidebar() {
        if (mobileSidebar) {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', closeMobileSidebar);
    }
    
    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
    
    // Close sidebar when clicking on a link
    const sidebarLinks = document.querySelectorAll('#mobile-sidebar .nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMobileSidebar);
    });
    
    // Enhanced mobile language and theme toggles
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', function() {
            toggleLanguage();
        });
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }

    // Enhanced Language toggle functionality
    const languageToggle = document.getElementById('language-toggle');
    const htmlElement = document.documentElement;
    
    function toggleLanguage() {
        // Toggle language classes with smooth animation
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
        const directionStylesheet = document.getElementById('direction-stylesheet');
        if (directionStylesheet) {
            if (directionStylesheet.getAttribute('href').includes('rtl.css')) {
                directionStylesheet.setAttribute('href', directionStylesheet.getAttribute('href').replace('rtl.css', 'ltr.css'));
            } else {
                directionStylesheet.setAttribute('href', directionStylesheet.getAttribute('href').replace('ltr.css', 'rtl.css'));
            }
        }
        
        // Save language preference
        const currentLang = htmlElement.getAttribute('lang');
        localStorage.setItem('preferredLanguage', currentLang);
        
        // Add visual feedback
        const allLanguageButtons = document.querySelectorAll('#language-toggle, #mobile-language-toggle');
        allLanguageButtons.forEach(btn => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Enhanced Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    function toggleTheme() {
        // Toggle dark class on html element with smooth transition
        document.documentElement.classList.toggle('dark');
        
        // Toggle theme stylesheet
        const themeStylesheet = document.getElementById('theme-stylesheet');
        if (themeStylesheet) {
            const currentPath = themeStylesheet.getAttribute('href');
            const isRootPath = !currentPath.includes('/');
            const cssPrefix = isRootPath ? 'css/' : '../css/';
            
            if (currentPath.includes('light-theme.css')) {
                themeStylesheet.setAttribute('href', cssPrefix + 'dark-theme.css');
            } else {
                themeStylesheet.setAttribute('href', cssPrefix + 'light-theme.css');
            }
        }
        
        // Toggle logo visibility with smooth transition
        const lightLogos = document.querySelectorAll('.light-logo');
        const darkLogos = document.querySelectorAll('.dark-logo');
        
        lightLogos.forEach(logo => {
            logo.style.transition = 'opacity 0.3s ease';
            logo.classList.toggle('hidden');
        });
        
        darkLogos.forEach(logo => {
            logo.style.transition = 'opacity 0.3s ease';
            logo.classList.toggle('hidden');
        });
        
        // Save theme preference
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
        
        // Add visual feedback to theme buttons
        const allThemeButtons = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
        allThemeButtons.forEach(btn => {
            btn.style.transform = 'scale(0.95) rotate(180deg)';
            setTimeout(() => {
                btn.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile theme toggle functionality is already handled above

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
                // Apply theme without triggering click event to avoid animation on load
                document.documentElement.classList.toggle('dark', isDarkMode);
                
                // Update theme stylesheet
                const themeStylesheet = document.getElementById('theme-stylesheet');
                if (themeStylesheet) {
                    const currentPath = themeStylesheet.getAttribute('href');
                    const isRootPath = !currentPath.includes('/');
                    const cssPrefix = isRootPath ? 'css/' : '../css/';
                    
                    if (isDarkMode && currentPath.includes('light-theme.css')) {
                        themeStylesheet.setAttribute('href', cssPrefix + 'dark-theme.css');
                    } else if (!isDarkMode && currentPath.includes('dark-theme.css')) {
                        themeStylesheet.setAttribute('href', cssPrefix + 'light-theme.css');
                    }
                }
            }
        }
        
        // Set correct logo visibility based on current theme
        const isDarkMode = document.documentElement.classList.contains('dark');
        const lightLogos = document.querySelectorAll('.light-logo');
        const darkLogos = document.querySelectorAll('.dark-logo');
        
        lightLogos.forEach(logo => {
            logo.classList.toggle('hidden', isDarkMode);
        });
        
        darkLogos.forEach(logo => {
            logo.classList.toggle('hidden', !isDarkMode);
        });
    }
    
    // Apply user preferences immediately and after a short delay to avoid flash of incorrect theme/language
    applyUserPreferences();
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