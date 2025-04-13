// CustomCursor.js
// A reusable custom cursor component that can be included on any page

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.cursorFollowerX = 0;
        this.cursorFollowerY = 0;
        
        this.init();
    }
    
    init() {
        // Create cursor elements if they don't exist
        if (!document.getElementById('custom-cursor')) {
            this.cursor = document.createElement('div');
            this.cursor.id = 'custom-cursor';
            document.body.appendChild(this.cursor);
        } else {
            this.cursor = document.getElementById('custom-cursor');
        }
        
        if (!document.getElementById('custom-cursor-follower')) {
            this.cursorFollower = document.createElement('div');
            this.cursorFollower.id = 'custom-cursor-follower';
            document.body.appendChild(this.cursorFollower);
        } else {
            this.cursorFollower = document.getElementById('custom-cursor-follower');
        }
        
        // Add cursor-none class to body
        document.body.classList.add('cursor-none');
        
        // Add event listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.addHoverListeners();
        
        // Start animation
        this.updateCursor();
        
        // Check for dark sections to change cursor color
        this.checkDarkSections();
        document.addEventListener('scroll', this.checkDarkSections.bind(this));
    }
    
    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    addHoverListeners() {
        const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
    
    updateCursor() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.2;
        this.cursorY += (this.mouseY - this.cursorY) * 0.2;
        
        // Smoother follower movement
        this.cursorFollowerX += (this.mouseX - this.cursorFollowerX) * 0.1;
        this.cursorFollowerY += (this.mouseY - this.cursorFollowerY) * 0.1;
        
        // Update positions
        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.cursorFollower.style.transform = `translate(${this.cursorFollowerX}px, ${this.cursorFollowerY}px)`;
        
        // Continue animation
        requestAnimationFrame(this.updateCursor.bind(this));
    }
    
    checkDarkSections() {
        // Get elements with dark backgrounds
        const darkSections = document.querySelectorAll('.bg-black, .bg-gray-900, [data-dark-section]');
        let isOverDarkSection = false;
        
        darkSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Check if cursor is over this dark section
            if (
                this.mouseY >= rect.top &&
                this.mouseY <= rect.bottom &&
                this.mouseX >= rect.left &&
                this.mouseX <= rect.right
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});

export default CustomCursor; 