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
            const response = await fetch(`${window.postNestSettings.apiUrl}/settings`, {
                headers: {
                    'X-WP-Nonce': window.postNestSettings.nonce,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch settings');
            }

            const data = await response.json();
            setSettings(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            setLoading(true);
            const response = await fetch(`${window.postNestSettings.apiUrl}/settings`, {
                method: 'POST',
                headers: {
                    'X-WP-Nonce': window.postNestSettings.nonce,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSettings)
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }

            const data = await response.json();
            setSettings(data);
            setError(null);
            return true;
        } catch (err) {
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