import { setupAxios } from './axios';
import { setupI18n } from './i18n';

/**
 * Initialize all services
 * @returns {Promise<void>}
 */
export async function initializeServices() {
    setupAxios();
    await setupI18n();
}

// Export service utilities
export * from './hooks'; 