import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    return (
        <div className="pn-app">
            <Header />
            <div className="pn-content">
                <Sidebar />
                <main className="pn-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
} 