import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SocialAccounts from './pages/SocialAccounts';

/**
 * Initialize and render the React application
 * @param {ReactRoot} root - React 18 root instance
 * @returns {Promise<boolean>} - True if initialization successful
 */
export async function initializeApp(root) {
    try {
        // Get the WordPress admin URL for basename
        const adminUrl = window.postNestSettings?.adminUrl ?? '/';
        const basename = import.meta.env.DEV ? '/' : new URL(adminUrl).pathname;

        // Mock postNestSettings for development
        if (import.meta.env.DEV && !window.postNestSettings) {
            window.postNestSettings = {
                user: {
                    id: 1,
                    name: 'Dev User',
                    email: 'dev@example.com',
                    avatar: 'https://www.gravatar.com/avatar/default'
                },
                apiUrl: '/api',
                nonce: 'dev-nonce',
                adminUrl: '/',
                capabilities: {
                    canManageOptions: true,
                    canPublishPosts: true
                }
            };
        }

        // Render the app
        root.render(
            <React.StrictMode>
                <ErrorBoundary>
                    <BrowserRouter basename={basename}>
                        <Routes>
                            <Route path="/*" element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="social-accounts" element={<SocialAccounts />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ErrorBoundary>
            </React.StrictMode>
        );

        return true;
    } catch (error) {
        console.error('Failed to initialize app:', error);
        throw error;
    }
} 