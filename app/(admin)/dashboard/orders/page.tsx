'use client';

import { DashboardHeader, StatsCard, SearchAndFilters, DataTable, StatusBadge, ActionButtons, UserAvatar } from '../components';
import { useTableFilters, useFilteredData, useStatusHelpers } from '../hooks';

export default function Orders() {
    const { searchTerm, setSearchTerm, filters, setFilter } = useTableFilters({
        initialFilters: { status: 'all', dateRange: 'week' }
    });
    const { getOrderStatusConfig } = useStatusHelpers();

    // Mock orders data - in a real app, this would come from an API
    const orders = [
        {
            id: 'ORD-001',
            customer: { name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg' },
            items: 3,
            total: 299.99,
            status: 'pending',
            date: '2024-01-15',
            shippingAddress: '123 Main St, City, State 12345'
        },
        {
            id: 'ORD-002',
            customer: { name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg' },
            items: 1,
            total: 149.99,
            status: 'processing',
            date: '2024-01-14',
            shippingAddress: '456 Oak Ave, Town, State 67890'
        },
        {
            id: 'ORD-003',
            customer: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatars/mike.jpg' },
            items: 2,
            total: 89.98,
            status: 'shipped',
            date: '2024-01-13',
            shippingAddress: '789 Pine Rd, Village, State 13579'
        },
        {
            id: 'ORD-004',
            customer: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '/avatars/sarah.jpg' },
            items: 5,
            total: 459.95,
            status: 'delivered',
            date: '2024-01-12',
            shippingAddress: '321 Elm St, Borough, State 24680'
        },
        {
            id: 'ORD-005',
            customer: { name: 'David Brown', email: 'david@example.com', avatar: '/avatars/david.jpg' },
            items: 1,
            total: 199.99,
            status: 'cancelled',
            date: '2024-01-11',
            shippingAddress: '654 Maple Dr, District, State 97531'
        }
    ];

    const orderStats = [
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
            title: 'Pending Orders',
            value: '23',
            change: { value: '+5', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconColor: 'bg-yellow-500'
        },
        {
            title: 'Shipped Orders',
            value: '156',
            change: { value: '+8%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconColor: 'bg-green-500'
        },
        {
            title: 'Revenue',
            value: '$45,678',
            change: { value: '+15%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            iconColor: 'bg-purple-500'
        }
    ];

    // Custom filtering for orders since we have nested customer properties
    const filteredOrders = orders.filter(order => {
        const matchesSearch = searchTerm === '' ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filters.status === 'all' || order.status === filters.status;

        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            key: 'id',
            header: 'Order ID',
            render: (id: string) => <span className="font-medium text-blue-600">{id}</span>
        },
        {
            key: 'customer',
            header: 'Customer',
            render: (customer: any) => (
                <UserAvatar name={customer.name} email={customer.email} />
            )
        },
        {
            key: 'items',
            header: 'Items',
            className: 'text-center'
        },
        {
            key: 'total',
            header: 'Total',
            className: 'text-right',
            render: (total: number) => `$${total}`
        },
        {
            key: 'status',
            header: 'Status',
            className: 'text-center',
            render: (status: string) => {
                const config = getOrderStatusConfig(status);
                return <StatusBadge label={config.label} color={config.color} />;
            }
        },
        {
            key: 'date',
            header: 'Date',
            render: (date: string) => <span className="text-sm text-gray-600">{date}</span>
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-center',
            render: (value: any, order: any) => (
                <ActionButtons
                    buttons={[
                        { label: 'View', onClick: () => console.log('View order:', order.id), variant: 'primary' },
                        { label: 'Update', onClick: () => console.log('Update order:', order.id) }
                    ]}
                />
            )
        }
    ];

    return (
        <div className="p-6">
            <DashboardHeader
                title="Orders Management"
                subtitle="Track and manage customer orders"
                actions={
                    <>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Export Orders
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            Print Labels
                        </button>
                    </>
                }
            />

            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {orderStats.map((stat, index) => (
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

            <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search orders..."
                filters={[
                    {
                        key: 'status',
                        value: filters.status,
                        options: [
                            { value: 'all', label: 'All Status' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'processing', label: 'Processing' },
                            { value: 'shipped', label: 'Shipped' },
                            { value: 'delivered', label: 'Delivered' },
                            { value: 'cancelled', label: 'Cancelled' }
                        ],
                        onChange: (value) => setFilter('status', value)
                    },
                    {
                        key: 'dateRange',
                        value: filters.dateRange,
                        options: [
                            { value: 'today', label: 'Today' },
                            { value: 'week', label: 'This Week' },
                            { value: 'month', label: 'This Month' },
                            { value: 'quarter', label: 'This Quarter' }
                        ],
                        onChange: (value) => setFilter('dateRange', value)
                    }
                ]}
            />

            <DataTable
                title="Orders"
                data={filteredOrders}
                columns={columns}
                emptyMessage="No orders found matching your criteria"
            />
        </div>
    );
}
