import React from 'react';
import { Outlet } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    return (
        <div className="pn-app min-h-screen">
            <div className="flex min-h-[calc(100vh-4rem)]">
                <main className="flex-1 overflow-x-hidden">
                    <div className="mx-auto space-y-6 max-w-full">
                        <Sidebar />
                        <Outlet />
                    </div>
                </main>
            </div>
            {/* Quick Actions Floating Button Group */}
            <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
                <button 
                    className="pn-button-primary flex items-center space-x-2 shadow-lg rounded-full p-3 md:px-4"
                    title={__('Quick Post', 'post-nest')}
                >
                    <span>➕</span>
                    <span className="hidden md:inline">{__('Quick Post', 'post-nest')}</span>
                </button>
                <button 
                    className="pn-button-secondary flex items-center space-x-2 shadow-lg rounded-full p-3 md:px-4"
                    title={__('Help & Support', 'post-nest')}
                >
                    <span>❓</span>
                    <span className="hidden md:inline">{__('Help', 'post-nest')}</span>
                </button>
            </div>
        </div>
    );
} 