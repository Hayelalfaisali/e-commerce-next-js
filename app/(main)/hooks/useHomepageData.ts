import { useMemo } from 'react';
import { getAllProducts, getCategories, Product, Category } from '@/data';

export interface FeaturedProduct extends Product {
  featured: boolean;
  badge?: string;
}

export interface HomepageData {
  featuredProducts: FeaturedProduct[];
  categories: Category[];
  newArrivals: Product[];
  bestSellers: Product[];
  onSaleProducts: Product[];
}

export function useHomepageData(): HomepageData {
  const allProducts = getAllProducts();
  const categories = getCategories();

  return useMemo(() => {
    // Featured products (first 6 products with special badges)
    const featuredProducts: FeaturedProduct[] = allProducts.slice(0, 6).map((product, index) => ({
      ...product,
      featured: true,
      badge: index === 0 ? 'Editor\'s Choice' : index === 1 ? 'Best Seller' : index === 2 ? 'New Arrival' : undefined
    }));

    // New arrivals (last 4 products)
    const newArrivals = allProducts.slice(-4);

    // Best sellers (products with highest ratings)
    const bestSellers = [...allProducts]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    // On sale products (products with original price)
    const onSaleProducts = allProducts
      .filter(product => product.originalPrice && product.originalPrice > product.price)
      .slice(0, 4);

    return {
      featuredProducts,
      categories,
      newArrivals,
      bestSellers,
      onSaleProducts
    };
  }, [allProducts, categories]);
}

export function useHomepageStats() {
  const allProducts = getAllProducts();
  
  return useMemo(() => {
    const totalProducts = allProducts.length;
    const inStockProducts = allProducts.filter(p => p.inStock).length;
    const averageRating = allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length;
    const totalReviews = allProducts.reduce((sum, p) => sum + p.reviewCount, 0);

    return {
      totalProducts,
      inStockProducts,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      categories: getCategories().length
    };
  }, [allProducts]);
}
