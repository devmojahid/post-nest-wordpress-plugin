import { useState, useEffect } from 'react';

/**
 * Simple state management for settings
 * @returns {Object} Settings state and actions
 */
export function useSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            
            // Development mode with mock data
            if (import.meta.env.DEV && !window.postNestSettings) {
                // Mock data for development
                setTimeout(() => {
                    setSettings({
                        general: {
                            enable_features: true,
                            cache_duration: 3600
                        },
                        api: {
                            timeout: 30,
                            retries: 3
                        }
                    });
                    setLoading(false);
                }, 500); // Simulate network delay
                return;
            }

            // WordPress environment
            const apiUrl = window.postNestSettings?.apiUrl;
            if (!apiUrl) {
                throw new Error('API URL not configured');
            }

            const response = await fetch(`${apiUrl}/settings`, {
                method: 'GET',
                credentials: 'same-origin', // Important for WordPress cookie handling
                headers: {
                    'X-WP-Nonce': window.postNestSettings.nonce,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch settings: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format. Expected JSON.');
            }

            const data = await response.json();
            setSettings(data?.data || data); // Handle WordPress REST API response format
            setError(null);
        } catch (err) {
            console.error('Settings fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            setLoading(true);
            
            // Development mode
            if (import.meta.env.DEV && !window.postNestSettings) {
                setTimeout(() => {
                    setSettings(newSettings);
                    setLoading(false);
                }, 500);
                return true;
            }

            // WordPress environment
            const apiUrl = window.postNestSettings?.apiUrl;
            if (!apiUrl) {
                throw new Error('API URL not configured');
            }

            const response = await fetch(`${apiUrl}/settings`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-WP-Nonce': window.postNestSettings.nonce,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSettings)
            });

            if (!response.ok) {
                throw new Error(`Failed to update settings: ${response.statusText}`);
            }

            const data = await response.json();
            setSettings(data?.data || data);
            setError(null);
            return true;
        } catch (err) {
            console.error('Settings update error:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        fetchSettings,
        updateSettings
    };
} 