import axios from 'axios';

export function setupAxios() {
    // Create axios instance with default config
    const instance = axios.create({
        baseURL: window.postNestSettings.apiUrl,
        headers: {
            'X-WP-Nonce': window.postNestSettings.nonce,
            'Content-Type': 'application/json'
        }
    });

    // Add request interceptor
    instance.interceptors.request.use(
        (config) => {
            // You can modify request config here
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized
                window.location.href = window.postNestSettings.adminUrl;
            }
            return Promise.reject(error);
        }
    );

    // Make instance available globally
    window.postNestAxios = instance;
    return instance;
} 