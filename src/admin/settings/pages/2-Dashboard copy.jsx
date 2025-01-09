import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSettings } from '../services/state';
import { useNotice } from '../services/hooks';

export default function Dashboard() {
    const { settings, loading, error, fetchSettings } = useSettings();
    const showNotice = useNotice();

    if (loading) {
        return (
            <div className="pn-loading">
                <span className="spinner is-active"></span>
                <p>{__('Loading settings...', 'post-nest')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="notice notice-error">
                <p>{__('Error:', 'post-nest')} {error}</p>
                <button 
                    className="button button-secondary"
                    onClick={() => fetchSettings()}
                >
                    {__('Retry', 'post-nest')}
                </button>
            </div>
        );
    }

    return (
        <div className="pn-dashboard">
            <h1>{__('Dashboard', 'post-nest')}</h1>
            <div className="pn-dashboard-content">
                <p>{__('Welcome to Post Nest!', 'post-nest')}</p>
                {settings && (
                    <div className="pn-settings-display">
                        <h2>{__('Current Settings', 'post-nest')}</h2>
                        <pre className="pn-settings-json">
                            {JSON.stringify(settings, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
} 