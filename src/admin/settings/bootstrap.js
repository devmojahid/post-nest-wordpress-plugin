import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import { initializeApp } from './app.jsx';

// Store root globally but outside the function
const ROOT_ELEMENT_ID = 'post-nest-settings';
let root = null;

export async function bootstrap() {
    const loadingElement = document.getElementById('post-nest-settings-loading');
    const container = document.getElementById(ROOT_ELEMENT_ID);

    if (!container) {
        throw new Error('Post Nest settings container not found');
    }

    try {
        // Only create root once
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
    }
}

// Clean up function
export function cleanup() {
    if (root) {
        root.unmount();
        root = null;
    }
}