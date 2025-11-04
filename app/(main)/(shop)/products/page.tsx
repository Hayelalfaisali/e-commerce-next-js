'use client';

import { getAllProducts, getCategories } from '@/data';
import { useProductFilters, useFilteredProducts } from '../hooks';
import { ProductFilters, ProductGrid } from '../components';

export default function ProductsPage() {
    const products = getAllProducts();
    const categories = getCategories();
    
    const { searchTerm, setSearchTerm, filters, setFilter, resetFilters } = useProductFilters();
    const filteredProducts = useFilteredProducts(products, searchTerm, filters);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Our Products
                    </h1>
                    <p className="text-gray-600">
                        Discover our amazing collection of high-quality products
                    </p>
                </div>

                {/* Filters */}
                <ProductFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={filters}
                    onFilterChange={setFilter}
                    onResetFilters={resetFilters}
                    categories={categories}
                    totalProducts={filteredProducts.length}
                />

                {/* Products Grid */}
                <ProductGrid products={filteredProducts} />
            </div>
        </div>
    );
}