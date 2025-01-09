import React from 'react';
// import { __ } from '@wordpress/i18n';
import { useSettings } from '../services/state';
import { useNotice } from '../services/hooks';

export default function Dashboard() {
    const { settings, loading, error, updateSettings } = useSettings();
    const showNotice = useNotice();

    if (loading) {
        return <div>Loading settings...</div>;
    }

    if (error) {
        return (
            <div className="notice notice-error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="pn-dashboard">
            {/* <h1>{__('Dashboard', 'post-nest')}</h1> */}
            <h1>Dashboard</h1>
            <div className="pn-dashboard-content">
                {/* Add your dashboard content here */}
                {/* <p>{__('Welcome to Post Nest!', 'post-nest')}</p> */}
                <p>Welcome to Post Nest!</p>
                {settings && (
                    <pre>{JSON.stringify(settings, null, 2)}</pre>
                )}
            </div>
        </div>
    );
} 