import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import { initializeApp } from './app.jsx';

let root = null;

export async function bootstrap() {
    const loadingElement = document.getElementById('post-nest-settings-loading');
    const container = document.getElementById('post-nest-settings');

    if (!container) {
        throw new Error('Post Nest settings container not found');
    }

    try {
        // Create root only if it doesn't exist
        if (!root) {
            root = createRoot(container);
        }

        // Initialize the app
        await initializeApp(root);

        // Show app and hide loading screen
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        container.style.removeProperty('display');

    } catch (error) {
        console.error('Failed to initialize Post Nest:', error);
        
        if (loadingElement) {
            loadingElement.innerHTML = `
                <div class="post-nest-loading-content error">
                    <p>${__('Error loading Post Nest. Please refresh the page.', 'post-nest')}</p>
                    <pre>${error.message}</pre>
                </div>
            `;
        }
        
        throw error;
    }
}