import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export async function initializeApp(root) {
    try {
        // Initialize router
        await router.load();

        // Render the app
        root.render(
            <React.StrictMode>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </React.StrictMode>
        );

        return true;
    } catch (error) {
        console.error('Failed to initialize app:', error);
        throw error;
    }
} 