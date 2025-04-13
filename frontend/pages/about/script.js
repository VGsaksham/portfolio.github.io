document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-full');
    });
    
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.add('translate-x-full');
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-md', 'py-4');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('bg-white', 'shadow-md', 'py-4');
            navbar.classList.add('py-6');
        }
    });
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach((section, i) => {
        if (i === 0) return; // Skip hero section
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(section, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar .skill-progress');
    
    ScrollTrigger.create({
        trigger: '.skills-section',
        start: 'top 80%',
        onEnter: () => {
            skillBars.forEach(bar => {
                bar.style.width = bar.dataset.percent + '%';
            });
        },
        once: true
    });
}); 