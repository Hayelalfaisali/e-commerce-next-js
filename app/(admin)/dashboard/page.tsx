'use client';

import { DashboardHeader, StatsCard } from './components';

export default function Dashboard() {
    const statsData = [
        {
            title: 'Total Orders',
            value: '1,234',
            change: { value: '+12%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            iconColor: 'bg-blue-500'
        },
        {
            title: 'Revenue',
            value: '$45,678',
            change: { value: '+8%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            iconColor: 'bg-green-500'
        },
        {
            title: 'Customers',
            value: '892',
            change: { value: '+15%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            iconColor: 'bg-purple-500'
        },
        {
            title: 'Products',
            value: '156',
            change: { value: '-3%', type: 'decrease' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            iconColor: 'bg-orange-500'
        }
    ];

    const quickActions = [
        { name: 'Add Product', icon: '📦', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
        { name: 'View Orders', icon: '📋', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
        { name: 'Manage Users', icon: '👥', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
        { name: 'Analytics', icon: '📊', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' }
    ];

    const recentActivities = [
        { message: 'New order #1234 received', time: '2 min ago', color: 'bg-green-500' },
        { message: 'Product "Wireless Headphones" updated', time: '1 hour ago', color: 'bg-blue-500' },
        { message: 'Low stock alert for "Gaming Mouse"', time: '3 hours ago', color: 'bg-yellow-500' },
        { message: 'New user registration', time: '5 hours ago', color: 'bg-purple-500' }
    ];

    return (
        <div className="p-6">
            <DashboardHeader
                title="Dashboard Overview"
                subtitle="Welcome to your ShopHub admin panel"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                    />
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${action.color}`}
                            >
                                <span className="text-2xl mb-2">{action.icon}</span>
                                <span className="text-sm font-medium">{action.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                                <p className="text-sm text-gray-600 flex-1">{activity.message}</p>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Success Banner */}
            <div className="bg-linear-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                    <div className="shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🎉 Dashboard Ready!</h3>
                        <p className="text-gray-700 mb-3">
                            Your ShopHub admin dashboard is fully operational with modern design and comprehensive features.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Authentication System
                            </span>
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Protected Routes
                            </span>
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Modern UI Design
                            </span>
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Sidebar Navigation
                            </span>
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Role-based Access
                            </span>
                            <span className="flex items-center text-green-700">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Responsive Layout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}