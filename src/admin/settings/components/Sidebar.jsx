import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => (e) => {
        e.preventDefault();
        const baseUrl = window.postNestSettings.adminUrl;
        const page = path === '/' ? 'post-nest-settings' : `post-nest-${path.slice(1)}`;
        const wpUrl = `${baseUrl}admin.php?page=${page}`;
        window.history.pushState({}, '', wpUrl);
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    // Helper function for NavLink className
    const getNavLinkClass = ({ isActive }) => `
        relative group flex items-center px-4 py-2 text-sm font-medium
        transition-all duration-200 ease-in-out rounded-lg
        ${isActive 
            ? 'text-primary-700 bg-primary-50 shadow-sm' 
            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
        }
    `;

    // Helper function for icon container className
    const getIconContainerClass = ({ isActive }) => `
        w-8 h-8 rounded-lg flex items-center justify-center mr-3
        ${isActive 
            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md' 
            : 'bg-gray-100 group-hover:bg-primary-50'
        }
    `;

    // Helper function for badge className
    const getBadgeClass = ({ isActive }) => `
        ml-2 px-2 py-0.5 text-xs rounded-full
        ${isActive 
            ? 'bg-primary-200 text-primary-800' 
            : 'bg-gray-100 text-gray-600'
        }
    `;

    const navItems = [
        {
            path: '/',
            icon: '📊',
            label: __('Dashboard', 'post-nest'),
            description: __('Overview and analytics', 'post-nest'),
        },
        {
            path: '/social-accounts',
            icon: '🔗',
            label: __('Social Accounts', 'post-nest'),
            description: __('Manage your connections', 'post-nest'),
        }
    ];

    return (
        <div className="sticky top-0 z-50">
            {/* Main Navigation */}
            <nav className="pn-nav bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between h-16">
                        {/* Brand */}
                        <div className="flex items-center flex-shrink-0">
                            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-xl">📮</span>
                                </div>
                                <span className="font-bold text-gray-900 text-lg hidden sm:block">
                                    {__('Post Nest', 'post-nest')}
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1 px-2">
                            <div className="flex space-x-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={handleNavigation(item.path)}
                                        className={getNavLinkClass}
                                    >
                                        {/* Icon with gradient background */}
                                        <div 
                                        className={({ isActive }) => `
                                            w-8 h-8 rounded-lg flex items-center justify-center mr-3
                                            ${isActive 
                                                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md' 
                                                : 'bg-gray-100 group-hover:bg-primary-50'
                                            }
                                        `}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                        </div>
                                        
                                        {/* Label and Badge */}
                                        <div className="flex items-center">
                                            <span>{item.label}</span>
                                            {item.badge && (
                                                <span 
                                                className={({ isActive }) => `
                                                    ml-2 px-2 py-0.5 text-xs rounded-full
                                                    ${isActive 
                                                        ? 'bg-primary-200 text-primary-800' 
                                                        : 'bg-gray-100 text-gray-600'
                                                    }
                                                `}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Hover Tooltip */}
                                        <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                                            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
                                                {item.description}
                                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Search Button */}
                            <button className="p-2.5 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl">🔍</span>
                                </div>
                            </button>

                            {/* Settings Button */}
                            <button className="p-2.5 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl">⚙️</span>
                                </div>
                            </button>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2.5 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                    <div className="px-4 pt-2 pb-3 space-y-2 bg-gray-50 shadow-inner">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleNavigation(item.path)}
                                className={({ isActive }) => `
                                    flex items-center px-4 py-3 rounded-lg text-base font-medium
                                    transition-all duration-200
                                    ${isActive 
                                        ? 'bg-white text-primary-600 shadow-sm' 
                                        : 'text-gray-600 hover:bg-white hover:text-primary-600'
                                    }
                                `}
                            >
                                <div className={({ isActive }) => `
                                    w-10 h-10 rounded-lg flex items-center justify-center mr-3
                                    ${isActive 
                                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md' 
                                        : 'bg-gray-100'
                                    }
                                `}>
                                    <span className="text-xl">{item.icon}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>{item.label}</span>
                                    <span className="text-xs text-gray-500">{item.description}</span>
                                </div>
                                {item.badge && (
                                    <span className={({ isActive }) => `
                                        ml-auto px-2 py-0.5 text-xs rounded-full
                                        ${isActive 
                                            ? 'bg-primary-100 text-primary-700' 
                                            : 'bg-gray-100 text-gray-600'
                                        }
                                    `}>
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;