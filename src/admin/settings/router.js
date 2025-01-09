import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SocialAccounts from './pages/SocialAccounts';

// Create root route with Layout
const rootRoute = createRootRoute({
    component: Layout,
});

// Create child routes
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Dashboard,
});

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

// Create and export router
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    // Use WordPress admin URL as base
    basepath: window.postNestSettings?.adminUrl ?? '/',
});

// Ensure router is typed
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
} 