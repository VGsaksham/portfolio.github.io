// Agency Page Scripts

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseBtn = document.getElementById('close-menu');
const heroTitle = document.querySelector('.hero-title');
const heroDescription = document.querySelector('.hero-description');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize scroll animations first
    initScrollAnimations();
    
    // Initialize other components
    initNavbar();
    initMobileMenu();
    initHeroAnimation();
    initSectionAnimations();
    
    // Create stars
    const starsContainer = document.querySelector('.stars-container');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }

    // Handle loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingLogo = document.querySelector('.loading-logo');
    const content = document.querySelector('.content');
    
    if (loadingScreen && loadingLogo && content) {
        // Ensure loading screen is visible initially
        loadingScreen.style.opacity = '1';
        loadingScreen.style.pointerEvents = 'auto';
        
        // Animate the logo
        loadingLogo.style.opacity = '1';
        loadingLogo.style.transform = 'scale(1)';
        
        // Simulate loading time
        setTimeout(() => {
            // Fade out loading screen
            loadingScreen.classList.add('fade-out');
            
            // Show content with staggered animation
            content.classList.add('visible');
            const elements = content.querySelectorAll('.hero-badge, h1, p, .flex, .grid');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 2000);
    }

    // Initialize GSAP animations
    const mainScene = document.querySelector('.main-scene');
    if (mainScene) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainScene,
                start: "top top",
                end: "+=400%",
                scrub: 1,
                pin: true
            }
        });

        // Animate shapes
        tl.to(".shape-1", {
            scale: 1.5,
            rotation: 180,
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut"
        })
        .to(".shape-2", {
            scale: 1.3,
            rotation: -90,
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5")
        .to(".shape-3", {
            scale: 1.2,
            rotation: 120,
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5")
        .to(".shape-4", {
            scale: 1.4,
            rotation: -60,
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5")
        .to(".shape-5", {
            scale: 1.1,
            rotation: 45,
            opacity: 0.8,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5");

        // Animate floating elements
        tl.to(".float-1", {
            y: -100,
            rotation: 90,
            opacity: 0.6,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5")
        .to(".float-2", {
            y: 100,
            rotation: -90,
            opacity: 0.6,
            duration: 1,
            ease: "power2.inOut"
        }, "<")
        .to(".float-3", {
            y: -80,
            rotation: 45,
            opacity: 0.6,
            duration: 1,
            ease: "power2.inOut"
        }, "<")
        .to(".float-4", {
            y: 80,
            rotation: -45,
            opacity: 0.6,
            duration: 1,
            ease: "power2.inOut"
        }, "<");
    }

    // Initialize content sections after DOM is loaded
    const contentSections = {
        about: document.getElementById('about-content'),
        works: document.getElementById('works-content'),
        plans: document.getElementById('plans-content'),
        contact: document.getElementById('contact-content')
    };
    
    console.log('Content sections:', contentSections);
    
    // Make sure all sections are found
    Object.entries(contentSections).forEach(([key, section]) => {
        if (!section) {
            console.error(`Section ${key} not found in the DOM`);
        }
    });
    
    initNavbar();
    initMobileMenu();
    initHeroAnimation();
    initSectionAnimations();
    initSubNavigation(contentSections);
    initHeroButtons(contentSections);

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll-based animations
    const parallaxTexts = document.querySelectorAll('.parallax-text');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for text
        parallaxTexts.forEach(text => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            text.style.transform = `translateY(${yPos}px)`;
        });
        
        // Scroll reveal animation
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
        
        // Parallax effect for background elements
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach(shape => {
            const speed = 0.2;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Grid parallax effect
        const grid = document.querySelector('.animated-grid');
        if (grid) {
            const gridSpeed = 0.1;
            const gridYPos = -(scrolled * gridSpeed);
            grid.style.transform = `translateY(${gridYPos}px)`;
        }
        
        // Large circles rotation speed adjustment
        const circles = document.querySelectorAll('.large-circle');
        circles.forEach(circle => {
            const speed = 0.05;
            const rotation = scrolled * speed;
            circle.style.transform = `rotate(${rotation}deg)`;
        });
    });
    
    // Initial check for scroll reveal elements
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
});

// Sub Navigation Content Switching
function initSubNavigation(contentSections) {
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    console.log('Sub nav links:', subNavLinks.length);
    
    if (subNavLinks.length === 0) {
        console.error('No sub-nav links found');
        return;
    }
    
    // Show default content (about)
    showContent('about', contentSections);
    
    // Add click event listeners to sub-nav links
    subNavLinks.forEach(link => {
        const contentId = link.getAttribute('data-content');
        console.log(`Adding click listener for ${contentId}`);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Clicked on ${contentId}`);
            
            // Update active link
            subNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding content
            showContent(contentId, contentSections);
        });
    });
}

// Show content section and hide others
function showContent(contentId, contentSections) {
    console.log(`Showing content: ${contentId}`);
    
    // Hide all content sections
    Object.entries(contentSections).forEach(([key, section]) => {
        if (section) {
            console.log(`Hiding section: ${key}`);
            section.classList.add('hidden');
        }
    });
    
    // Show selected content section
    if (contentSections[contentId]) {
        console.log(`Showing section: ${contentId}`);
        contentSections[contentId].classList.remove('hidden');
        
        // Trigger animations for the visible section
        animateSection(contentSections[contentId]);
    } else {
        console.error(`Content section ${contentId} not found`);
    }
}

// Navbar Scroll Effect
function initNavbar() {
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu || !mobileMenuCloseBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    mobileMenuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
    
    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Hero Animation
function initHeroAnimation() {
    if (!heroTitle || !heroDescription) return;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroSection = document.querySelector('.hero-section');
    
    // Add mouse movement parallax effect to hero section
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const edgyShapes = document.querySelectorAll('.edgy-shape');
            const neonLines = document.querySelectorAll('.neon-line');
            
            edgyShapes.forEach((shape, index) => {
                const factor = (index + 1) * 0.2;
                shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px) rotate(${index * 45}deg)`;
            });
            
            neonLines.forEach((line, index) => {
                const factor = (index + 1) * 0.1;
                line.style.opacity = 0.3 + (Math.abs(moveX) * factor);
            });
        });
    }
    
    // Animate subtitle
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = 1;
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Split text into spans
    const titleSpans = heroTitle.querySelectorAll('span');
    
    // Animate title spans
    titleSpans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = 1;
            span.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Animate description
    setTimeout(() => {
        heroDescription.style.opacity = 1;
        heroDescription.style.transform = 'translateY(0)';
    }, 1200);
    
    // Create cyberpunk particles
    createCyberParticles();
}

// Create cyberpunk particles in the hero section
function createCyberParticles() {
    const container = document.getElementById('cyber-particles-container');
    if (!container) return;
    
    // Create 15 random particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random color
        const colors = ['#0ff', '#f0f', '#ff0', '#0f0'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration between 5s and 15s
        const duration = Math.random() * 10 + 5;
        particle.style.animation = `floatCyber ${duration}s linear infinite`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }
    
    // Add glitch effect occasionally
    setInterval(() => {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        if (glitchOverlay) {
            glitchOverlay.style.opacity = '0.8';
            setTimeout(() => {
                glitchOverlay.style.opacity = '0.5';
            }, 100);
        }
    }, 5000);
}

// Section Animations
function initSectionAnimations() {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section-container');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function animateSection(section) {
    if (!section) {
        console.error('Cannot animate null section');
        return;
    }
    
    console.log('Animating section:', section.id);
    
    try {
        // About Section
        if (section.id === 'about-content') {
            const title = section.querySelector('.about-title');
            const text = section.querySelector('.about-text');
            const textDelay = section.querySelector('.about-text-delay');
            const stats = section.querySelector('.about-stats');
            const image1 = section.querySelector('.about-image-1');
            const image2 = section.querySelector('.about-image-2');
            const accent = section.querySelector('.about-accent');
            
            if (title) {
                title.style.opacity = 1;
                title.style.transform = 'translateY(0)';
            }
            
            if (text) {
                setTimeout(() => {
                    text.style.opacity = 1;
                    text.style.transform = 'translateY(0)';
                }, 200);
            }
            
            if (textDelay) {
                setTimeout(() => {
                    textDelay.style.opacity = 1;
                    textDelay.style.transform = 'translateY(0)';
                }, 400);
            }
            
            if (stats) {
                setTimeout(() => {
                    stats.style.opacity = 1;
                    stats.style.transform = 'translateY(0)';
                }, 600);
            }
            
            if (image1) {
                setTimeout(() => {
                    image1.style.opacity = 1;
                    image1.style.transform = 'translateY(0)';
                }, 300);
            }
            
            if (image2) {
                setTimeout(() => {
                    image2.style.opacity = 1;
                    image2.style.transform = 'translateY(0)';
                }, 500);
            }
            
            if (accent) {
                setTimeout(() => {
                    accent.style.opacity = 1;
                    accent.style.transform = 'translateY(0)';
                }, 700);
            }
        }
        
        // Works Section
        if (section.id === 'works-content') {
            const title = section.querySelector('.work-title');
            const description = section.querySelector('.work-description');
            const items = section.querySelectorAll('.work-item');
            
            if (title) {
                title.style.opacity = 1;
                title.style.transform = 'translateY(0)';
            }
            
            if (description) {
                setTimeout(() => {
                    description.style.opacity = 1;
                    description.style.transform = 'translateY(0)';
                }, 200);
            }
            
            if (items.length) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });
            }
        }
        
        // Plans Section
        if (section.id === 'plans-content') {
            const title = section.querySelector('.plans-title');
            const description = section.querySelector('.plans-description');
            const cards = section.querySelectorAll('.plan-card');
            
            if (title) {
                title.style.opacity = 1;
                title.style.transform = 'translateY(0)';
            }
            
            if (description) {
                setTimeout(() => {
                    description.style.opacity = 1;
                    description.style.transform = 'translateY(0)';
                }, 200);
            }
            
            if (cards.length) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });
            }
        }
        
        // Contact Section
        if (section.id === 'contact-content') {
            const title = section.querySelector('.contact-title');
            const description = section.querySelector('.contact-description');
            
            if (title) {
                title.style.opacity = 1;
                title.style.transform = 'translateY(0)';
            }
            
            if (description) {
                setTimeout(() => {
                    description.style.opacity = 1;
                    description.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    } catch (error) {
        console.error('Error animating section:', error);
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Buttons Content Switching
function initHeroButtons(contentSections) {
    const heroButtons = document.querySelectorAll('.hero-section a[data-content]');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const contentId = button.getAttribute('data-content');
            console.log(`Hero button clicked for ${contentId}`);
            
            // Update active sub-nav link
            subNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-content') === contentId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to content section
            const subNav = document.getElementById('sub-nav');
            if (subNav) {
                window.scrollTo({
                    top: subNav.offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Show corresponding content after scrolling
            setTimeout(() => {
                showContent(contentId, contentSections);
            }, 500);
        });
    });
}

// Debug function
function debug(message) {
    console.log(`[Debug] ${message}`);
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    // Check if cursor is over a white background
    const elementUnderCursor = document.elementFromPoint(posX, posY);
    if (elementUnderCursor) {
        const backgroundColor = window.getComputedStyle(elementUnderCursor).backgroundColor;
        const isWhiteBackground = backgroundColor === 'rgb(255, 255, 255)' || 
                                backgroundColor === 'white' ||
                                elementUnderCursor.classList.contains('bg-white');
        
        if (isWhiteBackground) {
            cursorDot.style.backgroundColor = 'black';
            cursorOutline.style.borderColor = 'black';
        } else {
            cursorDot.style.backgroundColor = 'white';
            cursorOutline.style.borderColor = 'white';
        }
    }
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .card, .stat-card');
interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'scale(1.5)';
        cursorDot.style.transform = 'scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
        });
    });

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        starsContainer.appendChild(star);
    }
}

// Initialize animations
function initAnimations() {
    debug('Initializing animations...');
    
    // Create a longer scroll timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-scene",
            start: "top top",
            end: "+=400%",
            scrub: 1,
            pin: true,
            onEnter: () => debug('ScrollTrigger entered'),
            onLeave: () => debug('ScrollTrigger left'),
            onEnterBack: () => debug('ScrollTrigger entered back'),
            onLeaveBack: () => debug('ScrollTrigger left back')
        }
    });

    // Animate geometric shapes
    tl.to(".shape-1", {
        scale: 1.5,
        rotation: 180,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Shape 1 animation started')
    })
    .to(".shape-2", {
        scale: 1.3,
        rotation: -90,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Shape 2 animation started')
    }, "-=0.5")
    .to(".shape-3", {
        scale: 1.2,
        rotation: 120,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Shape 3 animation started')
    }, "-=0.5")
    .to(".shape-4", {
        scale: 1.4,
        rotation: -60,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Shape 4 animation started')
    }, "-=0.5")
    .to(".shape-5", {
        scale: 1.1,
        rotation: 45,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Shape 5 animation started')
    }, "-=0.5");

    // Animate floating elements
    tl.to(".float-1", {
        y: -100,
        rotation: 90,
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Float 1 animation started')
    }, "-=0.5")
    .to(".float-2", {
        y: 100,
        rotation: -90,
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Float 2 animation started')
    }, "<")
    .to(".float-3", {
        y: -80,
        rotation: 45,
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Float 3 animation started')
    }, "<")
    .to(".float-4", {
        y: 80,
        rotation: -45,
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Float 4 animation started')
    }, "<");

    // Animate content
    tl.to(".content h1", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onStart: () => debug('Content h1 animation started')
    }, "-=0.5")
    .to(".content p", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onStart: () => debug('Content p animation started')
    }, "-=0.5")
    .to(".content a", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onStart: () => debug('Content a animation started')
    }, "-=0.5");

    // Animate grid lines
    tl.to(".grid-lines", {
        opacity: 0.8,
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => debug('Grid lines animation started')
    }, "-=0.5");

    // Continuous animations
    gsap.to(".shape", {
        rotation: "+=5",
        duration: 20,
        repeat: -1,
        ease: "none",
        onStart: () => debug('Continuous shape rotation started')
    });

    gsap.to(".float-element", {
        y: "+=20",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        onStart: () => debug('Continuous float animation started')
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const scrollContainer = document.querySelector('.scroll-container');
    const stages = document.querySelectorAll('.scroll-stage');
    const initialShape = document.querySelector('.morph-shape');
    const grid = document.querySelector('.animated-grid');
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollVelocity = 0;
    
    // Calculate scroll progress
    function updateScrollProgress() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        scrollVelocity = Math.abs(scrollDelta) / 16; // Normalize to 60fps
        lastScrollY = currentScrollY;
        
        const scrollProgress = currentScrollY / (heroSection.offsetHeight - window.innerHeight);
        
        // Initial shape transformation with velocity-based timing
        if (initialShape) {
            const morphProgress = Math.min(scrollProgress * (1.5 + scrollVelocity), 1);
            initialShape.style.transform = `scale(${1 - morphProgress})`;
            initialShape.style.opacity = 1 - morphProgress;
        }
        
        // Grid animation with velocity-based timing
        if (grid) {
            const gridProgress = Math.min(scrollProgress * (1.2 + scrollVelocity), 1);
            grid.style.opacity = gridProgress;
            grid.style.transform = `scale(${0.8 + (gridProgress * 0.2)})`;
            
            // Add scroll-off effect with velocity consideration
            if (scrollProgress > 0.8) {
                const fadeOutProgress = (scrollProgress - 0.8) * (3 + scrollVelocity);
                grid.style.opacity = 1 - fadeOutProgress;
            }
        }
        
        // Stage visibility with improved timing and velocity consideration
        stages.forEach((stage, index) => {
            const stageProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.3) * (2.5 + scrollVelocity)));
            
            // Fade out content as we scroll
            if (scrollProgress > 0.2) {
                const fadeOutProgress = (scrollProgress - 0.2) * (2 + scrollVelocity);
                stage.style.opacity = 1 - fadeOutProgress;
                
                // Add scroll-off effect to all content elements
                const contentElements = stage.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-fade-in-delayed, .animate-fade-in-delayed-1, .animate-fade-in-delayed-2, .animate-fade-in-delayed-3, .parallax-text, .hero-button, .text-xl, .hero-badge, .container');
                contentElements.forEach((element) => {
                    element.style.opacity = 1 - fadeOutProgress;
                    element.style.transform = `translateY(${-30 * fadeOutProgress}px)`;
                });
            } else {
                stage.style.opacity = 1;
            }
        });
        
        // Parallax effect for text elements with velocity-based speed
        const parallaxTexts = document.querySelectorAll('.parallax-text');
        parallaxTexts.forEach((text) => {
            const speed = 0.3 * (1 + scrollVelocity * 0.5);
            const yPos = -(currentScrollY * speed);
            text.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax effect for floating elements with velocity-based speed
        const floatElements = document.querySelectorAll('.float-element');
        floatElements.forEach((element, index) => {
            const speed = (0.1 + (index * 0.05)) * (1 + scrollVelocity * 0.5);
            const yPos = -(currentScrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Show stat cards based on scroll progress
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card) => {
            if (scrollProgress > 0.2) {
                const fadeOutProgress = (scrollProgress - 0.2) * (2 + scrollVelocity);
                card.style.opacity = 1 - fadeOutProgress;
                card.style.transform = `translateY(${-30 * fadeOutProgress}px)`;
            } else {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Handle scroll events with improved throttling
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateScrollProgress();
} 