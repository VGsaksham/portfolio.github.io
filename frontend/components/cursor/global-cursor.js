// Global cursor initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if cursor is already initialized
    if (typeof window.cursorInitialized !== 'undefined') {
        console.log('Cursor already initialized, skipping duplicate initialization');
        return;
    }
    
    // Mark cursor as initialized to prevent duplicate initialization
    window.cursorInitialized = true;
    
    // Load the cursor script
    const cursorScript = document.createElement('script');
    cursorScript.src = '/frontend/components/cursor/cursor.js';
    document.body.appendChild(cursorScript);
    
    console.log('Global cursor initialization complete');
}); 