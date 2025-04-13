// Custom cursor functionality
(function() {
    console.log('Cursor script loaded');
    
    // Inject styles directly to ensure cursor is visible
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #custom-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: #000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            display: block !important;
            opacity: 1 !important;
            top: 0;
            left: 0;
            visibility: visible !important;
        }
        
        #custom-cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid #000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            display: block !important;
            opacity: 1 !important;
            top: 0;
            left: 0;
            visibility: visible !important;
        }
        
        body.cursor-white #custom-cursor {
            background-color: #fff;
        }
        
        body.cursor-white #custom-cursor-follower {
            border-color: #fff;
        }
        
        body.cursor-hover #custom-cursor-follower {
            width: 60px;
            height: 60px;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Function to initialize the cursor
    function initCursor() {
        console.log('Initializing cursor');
        
        // Check if cursor is already initialized
        if (typeof window.cursorInitialized !== 'undefined') {
            console.log('Cursor already initialized, skipping duplicate initialization');
            return;
        }
        
        // Mark as initialized to prevent duplicate initialization
        window.cursorInitialized = true;
        
        // Create cursor elements if they don't exist
        let cursor = document.getElementById('custom-cursor');
        let cursorFollower = document.getElementById('custom-cursor-follower');
        
        console.log('Cursor element found:', !!cursor);
        console.log('Cursor follower element found:', !!cursorFollower);
        
        if (!cursor) {
            console.log('Creating cursor element');
            cursor = document.createElement('div');
            cursor.id = 'custom-cursor';
            document.body.appendChild(cursor);
        }
        
        if (!cursorFollower) {
            console.log('Creating cursor follower element');
            cursorFollower = document.createElement('div');
            cursorFollower.id = 'custom-cursor-follower';
            document.body.appendChild(cursorFollower);
        }
        
        // Make sure cursor elements are visible
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        
        // Check if we're not on a touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            console.log('Touch device detected, hiding cursor');
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            return;
        }
        
        // Add cursor-none class to body
        document.body.classList.add('cursor-none');
        
        // Variables for cursor position
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let cursorFollowerX = 0;
        let cursorFollowerY = 0;
        
        // Update mouse position on mouse move
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Add hover effect to interactive elements
        const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
        
        // Check for dark sections to change cursor color
        function checkDarkSections() {
            // Get elements with dark backgrounds
            const darkSections = document.querySelectorAll('.bg-black, .bg-gray-900, [data-dark-section]');
            let isOverDarkSection = false;
            
            darkSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                
                // Check if cursor is over this dark section
                if (
                    mouseY >= rect.top &&
                    mouseY <= rect.bottom &&
                    mouseX >= rect.left &&
                    mouseX <= rect.right
                ) {
                    isOverDarkSection = true;
                }
            });
            
            // Toggle white cursor class
            if (isOverDarkSection) {
                document.body.classList.add('cursor-white');
            } else {
                document.body.classList.remove('cursor-white');
            }
        }
        
        // Check dark sections on scroll
        document.addEventListener('scroll', checkDarkSections);
        
        // Animation function
        function updateCursor() {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            // Smoother follower movement
            cursorFollowerX += (mouseX - cursorFollowerX) * 0.1;
            cursorFollowerY += (mouseY - cursorFollowerY) * 0.1;
            
            // Update positions
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursorFollower.style.transform = `translate(${cursorFollowerX}px, ${cursorFollowerY}px)`;
            
            // Check dark sections
            checkDarkSections();
            
            // Continue animation
            requestAnimationFrame(updateCursor);
        }
        
        // Start animation
        updateCursor();
        
        console.log('Custom cursor initialized successfully');
    }

    // Try to initialize immediately if document is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document already loaded, initializing cursor immediately');
        initCursor();
    } else {
        // Otherwise wait for DOMContentLoaded
        console.log('Document not yet loaded, waiting for DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', initCursor);
    }
})(); 