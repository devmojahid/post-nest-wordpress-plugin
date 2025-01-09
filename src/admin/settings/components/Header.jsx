import React from 'react';
// import { __ } from '@wordpress/i18n';
import { useUser } from '../services/hooks';

export default function Header() {
    const user = useUser();

    return (
        <header className="pn-header">
            <div className="pn-header-content">
                {/* <h1>{__('Post Nest', 'post-nest')}</h1> */}
                <h1>Post Nest</h1>
                <div className="pn-user-info">
                    <img src={user.avatar} alt={user.name} className="pn-avatar" />
                    <span>{user.name}</span>
                </div>
            </div>
        </header>
    );
} 