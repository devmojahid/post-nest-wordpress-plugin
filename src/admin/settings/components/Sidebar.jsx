import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

const Sidebar = () => {
    return (
        <aside className="pn-sidebar">
            <nav className="pn-nav">
                <ul>
                    <li>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {__('Dashboard', 'post-nest')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/social-accounts"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {__('Social Accounts', 'post-nest')}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;