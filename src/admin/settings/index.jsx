import React from 'react';
import { createRoot } from 'react-dom/client';
import { bootstrap } from './bootstrap';

// Only initialize in WordPress context
if (window.postNestSettings) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
}

// For Vite development server
if (import.meta.env.DEV && !window.postNestSettings) {
    const container = document.getElementById('post-nest-settings');
    if (container) {
        const root = createRoot(container);
        bootstrap(root);
    }
} 