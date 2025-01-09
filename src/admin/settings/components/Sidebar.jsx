import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => (e) => {
        e.preventDefault();
        
        // Update WordPress admin URL
        const baseUrl = window.postNestSettings.adminUrl;
        const page = path === '/' ? 'post-nest-settings' : `post-nest-${path.slice(1)}`;
        const wpUrl = `${baseUrl}admin.php?page=${page}`;
        
        // Update browser history without refresh
        window.history.pushState({}, '', wpUrl);
        
        // Navigate in React app
        navigate(path);
    };

    return (
        <aside className="pn-sidebar">
            <nav className="pn-nav">
                <ul>
                    <li>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={handleNavigation('/')}
                        >
                            {__('Dashboard', 'post-nest')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/social-accounts"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={handleNavigation('/social-accounts')}
                        >
                            {__('Social Accounts', 'post-nest')}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

// const Sidebar = () => {
//     return (
//         <aside className="pn-sidebar">
//             <nav className="pn-nav">
//                 <ul>
//                     <li>
//                         <NavLink 
//                             to="/"
//                             className={({ isActive }) => isActive ? 'active' : ''}
//                         >
//                             {__('Dashboard', 'post-nest')}
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink 
//                             to="/social-accounts"
//                             className={({ isActive }) => isActive ? 'active' : ''}
//                         >
//                             {__('Social Accounts', 'post-nest')}
//                         </NavLink>
//                     </li>
//                 </ul>
//             </nav>
//         </aside>
//     );
// }

// export default Sidebar;