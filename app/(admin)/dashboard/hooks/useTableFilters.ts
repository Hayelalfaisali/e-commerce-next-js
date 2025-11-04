import { useState, useMemo } from 'react';

export interface TableFiltersState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}

interface UseTableFiltersOptions {
  initialFilters?: Record<string, string>;
}

export function useTableFilters(options: UseTableFiltersOptions = {}): TableFiltersState {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>(
    options.initialFilters || {}
  );

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters(options.initialFilters || {});
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    resetFilters
  };
}

// Generic filter function for arrays
export function useFilteredData<T>(
  data: T[],
  searchTerm: string,
  filters: Record<string, string>,
  searchFields: (keyof T)[],
  filterFields: Record<string, keyof T>
): T[] {
  return useMemo(() => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        searchFields.some(field => {
          const value = item[field];
          return value && 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });

      // Other filters
      const matchesFilters = Object.entries(filters).every(([filterKey, filterValue]) => {
        if (filterValue === 'all' || filterValue === '') return true;
        const fieldKey = filterFields[filterKey];
        if (!fieldKey) return true;
        return item[fieldKey] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters, searchFields, filterFields]);
}
