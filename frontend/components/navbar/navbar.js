// Common navbar functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-md', 'py-4');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.remove('bg-white', 'shadow-md', 'py-4');
                navbar.classList.add('py-6');
                
                // If at top and hero is black, keep text white
                const firstSection = document.querySelector('section:first-of-type');
                if (firstSection && (
                    firstSection.classList.contains('bg-black') || 
                    window.getComputedStyle(firstSection).backgroundColor.includes('rgb(0, 0, 0)')
                )) {
                    navbar.classList.add('navbar-dark');
                }
            }
        });
        
        // Initial check for dark background
        const firstSection = document.querySelector('section:first-of-type');
        if (firstSection && (
            firstSection.classList.contains('bg-black') || 
            window.getComputedStyle(firstSection).backgroundColor.includes('rgb(0, 0, 0)')
        )) {
            navbar.classList.add('navbar-dark');
        }
    }
}); 