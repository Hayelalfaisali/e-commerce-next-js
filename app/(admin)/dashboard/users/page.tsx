'use client';

import { DashboardHeader, StatsCard, SearchAndFilters, DataTable, StatusBadge, ActionButtons, UserAvatar } from '../components';
import { useTableFilters, useFilteredData, useStatusHelpers } from '../hooks';

export default function Users() {
    const { searchTerm, setSearchTerm, filters, setFilter } = useTableFilters({
        initialFilters: { role: 'all', status: 'all' }
    });
    const { getUserStatusConfig, getUserRoleConfig } = useStatusHelpers();

    // Mock users data - in a real app, this would come from an API
    const users = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'customer',
            status: 'active',
            joinDate: '2024-01-15',
            lastLogin: '2024-01-20',
            orders: 12,
            totalSpent: 1299.99,
            avatar: '/avatars/john.jpg'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'admin',
            status: 'active',
            joinDate: '2023-12-10',
            lastLogin: '2024-01-21',
            orders: 0,
            totalSpent: 0,
            avatar: '/avatars/jane.jpg'
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'customer',
            status: 'inactive',
            joinDate: '2024-01-08',
            lastLogin: '2024-01-18',
            orders: 5,
            totalSpent: 459.95,
            avatar: '/avatars/mike.jpg'
        },
        {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            role: 'customer',
            status: 'active',
            joinDate: '2023-11-22',
            lastLogin: '2024-01-21',
            orders: 28,
            totalSpent: 2899.50,
            avatar: '/avatars/sarah.jpg'
        },
        {
            id: '5',
            name: 'David Brown',
            email: 'david@example.com',
            role: 'customer',
            status: 'suspended',
            joinDate: '2024-01-05',
            lastLogin: '2024-01-15',
            orders: 3,
            totalSpent: 199.99,
            avatar: '/avatars/david.jpg'
        }
    ];

    const userStats = [
        {
            title: 'Total Users',
            value: '2,847',
            change: { value: '+12%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            iconColor: 'bg-blue-500'
        },
        {
            title: 'Active Users',
            value: '2,234',
            change: { value: '+8%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconColor: 'bg-green-500'
        },
        {
            title: 'New This Month',
            value: '156',
            change: { value: '+23%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            iconColor: 'bg-purple-500'
        },
        {
            title: 'Avg. Order Value',
            value: '$89.50',
            change: { value: '+5%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            iconColor: 'bg-orange-500'
        }
    ];

    const filteredUsers = useFilteredData(
        users,
        searchTerm,
        filters,
        ['name', 'email'],
        { role: 'role', status: 'status' }
    );

    const columns = [
        {
            key: 'user',
            header: 'User',
            render: (value: any, user: any) => (
                <UserAvatar name={user.name} email={user.email} />
            )
        },
        {
            key: 'role',
            header: 'Role',
            className: 'text-center',
            render: (role: string) => {
                const config = getUserRoleConfig(role);
                return <StatusBadge label={config.label} color={config.color} />;
            }
        },
        {
            key: 'status',
            header: 'Status',
            className: 'text-center',
            render: (status: string) => {
                const config = getUserStatusConfig(status);
                return <StatusBadge label={config.label} color={config.color} />;
            }
        },
        {
            key: 'orders',
            header: 'Orders',
            className: 'text-right'
        },
        {
            key: 'totalSpent',
            header: 'Total Spent',
            className: 'text-right',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: 'joinDate',
            header: 'Join Date',
            render: (date: string) => <span className="text-sm text-gray-600">{date}</span>
        },
        {
            key: 'lastLogin',
            header: 'Last Login',
            render: (date: string) => <span className="text-sm text-gray-600">{date}</span>
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-center',
            render: (value: any, user: any) => (
                <ActionButtons
                    buttons={[
                        { label: 'Edit', onClick: () => console.log('Edit user:', user.id), variant: 'primary' },
                        { 
                            label: user.status === 'suspended' ? 'Unsuspend' : 'Suspend', 
                            onClick: () => console.log('Toggle user status:', user.id),
                            variant: 'danger'
                        }
                    ]}
                />
            )
        }
    ];

    return (
        <div className="p-6">
            <DashboardHeader 
                title="Users Management" 
                subtitle="Manage customer accounts and user permissions"
                actions={
                    <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                            Add User
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            Export Users
                        </button>
                    </>
                }
            />

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {userStats.map((stat, index) => (
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
                searchPlaceholder="Search users..."
                filters={[
                    {
                        key: 'role',
                        value: filters.role,
                        options: [
                            { value: 'all', label: 'All Roles' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'customer', label: 'Customer' }
                        ],
                        onChange: (value) => setFilter('role', value)
                    },
                    {
                        key: 'status',
                        value: filters.status,
                        options: [
                            { value: 'all', label: 'All Status' },
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'suspended', label: 'Suspended' }
                        ],
                        onChange: (value) => setFilter('status', value)
                    }
                ]}
            />

            <DataTable
                title="Users"
                data={filteredUsers}
                columns={columns}
                emptyMessage="No users found matching your criteria"
            />
        </div>
    );
}
