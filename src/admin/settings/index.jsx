import './styles/main.css';
import React from 'react';
import { bootstrap, cleanup } from './bootstrap';

// Only initialize in WordPress context
if (window.postNestSettings) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }

    // Add cleanup on unload
    window.addEventListener('unload', cleanup);
}

// For Vite development server
if (import.meta.env.DEV && !window.postNestSettings) {
    bootstrap();
} 