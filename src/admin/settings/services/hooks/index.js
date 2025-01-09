import { useCallback } from 'react';
// import { __ } from '@wordpress/i18n';

/**
 * Hook for showing WordPress admin notices
 * @returns {(message: string, type?: string) => void}
 */
export function useNotice() {
    return useCallback((message, type = 'success') => {
        wp.data.dispatch('core/notices').createNotice(
            type,
            message,
            {
                type: 'snackbar',
                isDismissible: true,
            }
        );
    }, []);
}

/**
 * Hook for accessing current user data
 * @returns {Object} User data
 */
export function useUser() {
    return window.postNestSettings.user;
}

/**
 * Hook for checking user capabilities
 * @returns {Object} User capabilities
 */
export function useCapabilities() {
    return window.postNestSettings.capabilities;
} 