'use client';

import { DashboardHeader, StatsCard, SearchAndFilters, DataTable, StatusBadge, ActionButtons } from '../components';
import { useTableFilters, useFilteredData, useStatusHelpers } from '../hooks';
import { getAllProducts, Product } from '@/data';

export default function Inventory() {
    const { searchTerm, setSearchTerm, filters, setFilter } = useTableFilters({
        initialFilters: { category: 'all', sortBy: 'name' }
    });
    const { getStockStatusConfig } = useStatusHelpers();
    
    const products = getAllProducts();
    
    const inventoryStats = [
        {
            title: 'Total Products',
            value: products.length.toString(),
            change: { value: '+5', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            iconColor: 'bg-blue-500'
        },
        {
            title: 'Low Stock Items',
            value: '12',
            change: { value: '+3', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            iconColor: 'bg-yellow-500'
        },
        {
            title: 'Out of Stock',
            value: '3',
            change: { value: '-2', type: 'decrease' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
            ),
            iconColor: 'bg-red-500'
        },
        {
            title: 'Total Value',
            value: '$124,567',
            change: { value: '+8%', type: 'increase' as const },
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            iconColor: 'bg-green-500'
        }
    ];

    const categories = ['all', 'electronics', 'clothing', 'home', 'sports', 'books'];

    const filteredProducts = useFilteredData(
        products,
        searchTerm,
        filters,
        ['name', 'description'],
        { category: 'category' }
    );

    const columns = [
        {
            key: 'product',
            header: 'Product',
            render: (value: any, product: Product) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: 'category',
            header: 'Category',
            render: (category: string) => (
                <span className="text-sm text-gray-600 capitalize">{category}</span>
            )
        },
        {
            key: 'price',
            header: 'Price',
            className: 'text-right',
            render: (price: number) => (
                <span className="font-medium text-gray-900">${price}</span>
            )
        },
        {
            key: 'stockCount',
            header: 'Stock',
            className: 'text-right',
            render: (stockCount: number) => (
                <span className="font-medium text-gray-900">{stockCount}</span>
            )
        },
        {
            key: 'status',
            header: 'Status',
            className: 'text-center',
            render: (value: any, product: Product) => {
                const config = getStockStatusConfig(product.stockCount, product.inStock);
                return <StatusBadge label={config.label} color={config.color} />;
            }
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-center',
            render: (value: any, product: Product) => (
                <ActionButtons
                    buttons={[
                        { label: 'Edit', onClick: () => console.log('Edit product:', product.id), variant: 'primary' },
                        { label: 'Delete', onClick: () => console.log('Delete product:', product.id), variant: 'danger' }
                    ]}
                />
            )
        }
    ];

    return (
        <div className="p-6">
            <DashboardHeader 
                title="Inventory Management" 
                subtitle="Manage your product inventory and stock levels"
                actions={
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                            Add Product
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            Import CSV
                        </button>
                    </div>
                }
            />

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {inventoryStats.map((stat, index) => (
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
                searchPlaceholder="Search products..."
                filters={[
                    {
                        key: 'category',
                        value: filters.category,
                        options: [
                            { value: 'all', label: 'All Categories' },
                            { value: 'electronics', label: 'Electronics' },
                            { value: 'clothing', label: 'Clothing' },
                            { value: 'home', label: 'Home' },
                            { value: 'sports', label: 'Sports' },
                            { value: 'books', label: 'Books' }
                        ],
                        onChange: (value) => setFilter('category', value)
                    },
                    {
                        key: 'sortBy',
                        value: filters.sortBy,
                        options: [
                            { value: 'name', label: 'Sort by Name' },
                            { value: 'price', label: 'Sort by Price' },
                            { value: 'stock', label: 'Sort by Stock' },
                            { value: 'category', label: 'Sort by Category' }
                        ],
                        onChange: (value) => setFilter('sortBy', value)
                    }
                ]}
            />

            <DataTable
                title="Products"
                data={filteredProducts.slice(0, 20)}
                columns={columns}
                emptyMessage="No products found matching your criteria"
            />
        </div>
    );
}
