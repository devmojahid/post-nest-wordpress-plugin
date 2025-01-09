import React from 'react';
import { __ } from '@wordpress/i18n';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';

export default function Dashboard() {
    // Dummy data
    const stats = {
        totalPosts: {
            value: '1,234',
            trend: { type: 'up', value: '+12.5% from last month' }
        },
        scheduledPosts: {
            value: '56',
            trend: { type: 'up', value: '+3.2% from last week' }
        },
        engagementRate: {
            value: '4.8%',
            trend: { type: 'down', value: '-0.5% from last week' }
        },
        activeAccounts: {
            value: '8',
            trend: { type: 'up', value: '+2 this month' }
        }
    };

    const platforms = [
        { name: 'Facebook', connected: true, lastSync: '2 minutes ago' },
        { name: 'Twitter', connected: true, lastSync: '5 minutes ago' },
        { name: 'Instagram', connected: true, lastSync: '1 hour ago' },
        { name: 'LinkedIn', connected: false, lastSync: 'Never' }
    ];

    const recentActivity = [
        { id: 1, type: 'post', platform: 'Facebook', status: 'published', time: '2 hours ago' },
        { id: 2, type: 'schedule', platform: 'Twitter', status: 'pending', time: '5 hours ago' },
        { id: 3, type: 'engagement', platform: 'Instagram', status: 'completed', time: '1 day ago' }
    ];

    return (
        <div className="space-y-6">
            {/* Enhanced Header with Notification */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
                <div>
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {__('Welcome back', 'post-nest')} 👋
                        </h1>
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                            {__('Pro', 'post-nest')}
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {__('Here\'s what\'s happening with your social media accounts', 'post-nest')}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="pn-button-secondary inline-flex items-center justify-center">
                        <span className="mr-2">📊</span>
                        {__('Analytics', 'post-nest')}
                    </button>
                    <button className="pn-button-primary inline-flex items-center justify-center">
                        <span className="mr-2">✨</span>
                        {__('Create Post', 'post-nest')}
                    </button>
                </div>
            </div>

            {/* Quick Actions with Hover Effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="pn-card p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{__('Draft Posts', 'post-nest')}</h3>
                        <p className="text-sm text-gray-500">{__('You have 3 drafts', 'post-nest')}</p>
                    </div>
                </div>
                <div className="pn-card p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{__('Analytics', 'post-nest')}</h3>
                        <p className="text-sm text-gray-500">{__('View performance', 'post-nest')}</p>
                    </div>
                </div>
                <div className="pn-card p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{__('Quick Schedule', 'post-nest')}</h3>
                        <p className="text-sm text-gray-500">{__('Plan your content', 'post-nest')}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid with Enhanced Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title={__('Total Posts', 'post-nest')}
                    value={stats.totalPosts.value}
                    trend={stats.totalPosts.trend}
                    icon="📊"
                />
                <StatCard 
                    title={__('Scheduled Posts', 'post-nest')}
                    value={stats.scheduledPosts.value}
                    trend={stats.scheduledPosts.trend}
                    icon="📅"
                />
                <StatCard 
                    title={__('Engagement Rate', 'post-nest')}
                    value={stats.engagementRate.value}
                    trend={stats.engagementRate.trend}
                    icon="📈"
                />
                <StatCard 
                    title={__('Active Accounts', 'post-nest')}
                    value={stats.activeAccounts.value}
                    trend={stats.activeAccounts.trend}
                    icon="🔗"
                />
            </div>

            {/* Enhanced Charts Section with Toggle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="pn-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {__('Engagement Overview', 'post-nest')}
                        </h3>
                        <select className="pn-button-secondary text-sm">
                            <option>{__('Last 7 days', 'post-nest')}</option>
                            <option>{__('Last 30 days', 'post-nest')}</option>
                            <option>{__('Last 90 days', 'post-nest')}</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                        <p className="text-gray-500">{__('Chart placeholder', 'post-nest')}</p>
                    </div>
                </div>
                <div className="pn-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            {__('Post Performance', 'post-nest')}
                        </h3>
                        <select className="pn-button-secondary text-sm">
                            <option>{__('Last 7 days', 'post-nest')}</option>
                            <option>{__('Last 30 days', 'post-nest')}</option>
                            <option>{__('Last 90 days', 'post-nest')}</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                        <p className="text-gray-500">{__('Chart placeholder', 'post-nest')}</p>
                    </div>
                </div>
            </div>

            {/* Enhanced Connected Platforms */}
            <div className="pn-card">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            {__('Connected Platforms', 'post-nest')}
                        </h2>
                        <button className="pn-button-secondary text-sm">
                            {__('Manage Connections', 'post-nest')}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {platforms.map(platform => (
                            <div key={platform.name} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{platform.name}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        platform.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {platform.connected ? __('Connected', 'post-nest') : __('Disconnected', 'post-nest')}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    {__('Last sync:', 'post-nest')} {platform.lastSync}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="pn-card">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            {__('Recent Activity', 'post-nest')}
                        </h2>
                        <button className="pn-button-secondary text-sm">
                            {__('View All', 'post-nest')}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <span className="text-lg">{
                                        activity.type === 'post' ? '📝' : 
                                        activity.type === 'schedule' ? '📅' : '📊'
                                    }</span>
                                    <div>
                                        <p className="font-medium">{activity.platform}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    activity.status === 'published' ? 'bg-green-100 text-green-800' :
                                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 