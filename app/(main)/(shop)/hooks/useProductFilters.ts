import { useState, useMemo } from 'react';
import { Product } from '@/data';

export interface ProductFilters {
  category: string;
  priceRange: string;
  inStock: boolean;
  sortBy: string;
}

export interface UseProductFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: ProductFilters;
  setFilter: (key: keyof ProductFilters, value: any) => void;
  resetFilters: () => void;
}

const initialFilters: ProductFilters = {
  category: 'all',
  priceRange: 'all',
  inStock: false,
  sortBy: 'name'
};

export function useProductFilters(): UseProductFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const setFilter = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters(initialFilters);
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    resetFilters
  };
}

export function useFilteredProducts(
  products: Product[],
  searchTerm: string,
  filters: ProductFilters
): Product[] {
  return useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = filters.category === 'all' || product.category === filters.category;

      // Price range filter
      const matchesPriceRange = filters.priceRange === 'all' || (() => {
        switch (filters.priceRange) {
          case 'under-50': return product.price < 50;
          case '50-100': return product.price >= 50 && product.price <= 100;
          case '100-200': return product.price >= 100 && product.price <= 200;
          case 'over-200': return product.price > 200;
          default: return true;
        }
      })();

      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;

      return matchesSearch && matchesCategory && matchesPriceRange && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, filters]);
}
