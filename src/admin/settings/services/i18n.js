import { __ } from '@wordpress/i18n';

export async function setupI18n() {
    // Load translations
    await wp.i18n.setLocaleData(window.postNestSettings.translations || {}, 'post-nest');
    
    return {
        __: (text, domain = 'post-nest') => __(text, domain)
    };
} 