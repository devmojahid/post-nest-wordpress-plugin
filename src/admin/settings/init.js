import { bootstrap } from './bootstrap';

// Initialize the application when WordPress is ready
window.addEventListener('load', () => {
    // Ensure WordPress dependencies are loaded
    if (window.wp && window.wp.element && window.React) {
        bootstrap().catch(error => {
            console.error('Failed to bootstrap Post Nest:', error);
        });
    } else {
        console.error('WordPress dependencies not loaded. Required: wp, wp.element, React');
    }
}); 