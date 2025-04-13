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
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                // First remove all animation classes to reset
                item.classList.remove('animate-project');
                
                // Force reflow to restart animation
                void item.offsetWidth;
                
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    // Add animation with a slight delay to create staggered effect
                    setTimeout(() => {
                        item.classList.add('animate-project');
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Initialize animations
    projectItems.forEach((item, index) => {
        // Add animation with staggered delay
        setTimeout(() => {
            item.classList.add('animate-project');
        }, 100 * index);
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
    
    // Project hover effects
    const projectHoverItems = document.querySelectorAll('.project-item');
    
    projectHoverItems.forEach(item => {
        const overlay = item.querySelector('.absolute');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                duration: 0.3
            });
            
            gsap.to(overlay.querySelector('div'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: 0.1
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 0.3
            });
            
            gsap.to(overlay.querySelector('div'), {
                opacity: 0,
                y: 10,
                duration: 0.3
            });
        });
    });
}); 