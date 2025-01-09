import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SocialAccounts from './pages/SocialAccounts';

/**
 * Create root route with Layout
 * @type {import('@tanstack/react-router').Route}
 */
const rootRoute = createRootRoute({
    component: Layout,
});

/**
 * Create child routes
 * @type {import('@tanstack/react-router').Route}
 */
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Dashboard,
});

/**
 * @type {import('@tanstack/react-router').Route}
 */
const socialAccountsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/social-accounts',
    component: SocialAccounts,
});

// Build route tree
const routeTree = rootRoute.addChildren([
    indexRoute,
    socialAccountsRoute,
]);

/**
 * Create and export router
 * @type {import('@tanstack/react-router').Router}
 */
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    basepath: window.postNestSettings?.adminUrl ?? '/',
}); 