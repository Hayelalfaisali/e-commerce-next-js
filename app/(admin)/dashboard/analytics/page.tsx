'use client';

import { DashboardHeader, StatsCard, DataTable } from '../components';

export default function Analytics() {
    const analyticsStats = [
        {
            title: 'Page Views',
            value: '24,567',
            change: { value: '+18%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            iconColor: 'bg-blue-500'
        },
        {
            title: 'Conversion Rate',
            value: '3.24%',
            change: { value: '+0.5%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            iconColor: 'bg-green-500'
        },
        {
            title: 'Avg. Session',
            value: '4m 32s',
            change: { value: '+12s', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconColor: 'bg-purple-500'
        },
        {
            title: 'Bounce Rate',
            value: '42.3%',
            change: { value: '-2.1%', type: 'decrease' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            ),
            iconColor: 'bg-orange-500'
        }
    ];

    const topPages = [
        { page: '/products/wireless-headphones', views: 1234, percentage: 15.2 },
        { page: '/products/gaming-mouse', views: 987, percentage: 12.1 },
        { page: '/products/mechanical-keyboard', views: 756, percentage: 9.3 },
        { page: '/categories/electronics', views: 654, percentage: 8.0 },
        { page: '/products/smartphone', views: 543, percentage: 6.7 }
    ];

    const trafficSources = [
        { source: 'Organic Search', visitors: 3420, percentage: 45.2, color: 'bg-blue-500' },
        { source: 'Direct', visitors: 2100, percentage: 27.8, color: 'bg-green-500' },
        { source: 'Social Media', visitors: 1200, percentage: 15.9, color: 'bg-purple-500' },
        { source: 'Email', visitors: 560, percentage: 7.4, color: 'bg-orange-500' },
        { source: 'Referral', visitors: 280, percentage: 3.7, color: 'bg-pink-500' }
    ];

    const topPagesColumns = [
        {
            key: 'page',
            header: 'Page',
            render: (page: string) => (
                <span className="text-sm font-medium text-gray-900">{page}</span>
            )
        },
        {
            key: 'views',
            header: 'Views',
            className: 'text-right',
            render: (views: number) => (
                <span className="text-sm text-gray-600">{views.toLocaleString()}</span>
            )
        },
        {
            key: 'percentage',
            header: '% of Total',
            className: 'text-right',
            render: (percentage: number) => (
                <span className="text-sm text-gray-600">{percentage}%</span>
            )
        },
        {
            key: 'trend',
            header: 'Trend',
            className: 'text-right',
            render: () => (
                <span className="text-sm text-green-600">↗ +{Math.floor(Math.random() * 20)}%</span>
            )
        }
    ];

    return (
        <div className="p-6">
            <DashboardHeader 
                title="Analytics Dashboard" 
                subtitle="Track your website performance and user behavior"
                actions={
                    <div className="flex space-x-3">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Export Report
                        </button>
                    </div>
                }
            />

            {/* Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {analyticsStats.map((stat, index) => (
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

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Traffic Chart Placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Overview</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-gray-500">Chart visualization would go here</p>
                            <p className="text-sm text-gray-400 mt-1">Integration with chart library needed</p>
                        </div>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">{source.visitors.toLocaleString()}</span>
                                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                        {source.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DataTable
                title="Top Pages"
                data={topPages}
                columns={topPagesColumns}
                emptyMessage="No page data available"
            />
        </div>
    );
}
