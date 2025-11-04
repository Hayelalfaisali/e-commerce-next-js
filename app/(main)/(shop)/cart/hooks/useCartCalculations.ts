import { useMemo } from 'react';
import { CartItem } from '@/app/contexts/CartContext';

export interface CartCalculations {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  savings: number;
}

export function useCartCalculations(items: CartItem[]): CartCalculations {
  return useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    // Calculate savings from original prices
    const savings = items.reduce((sum, item) => {
      if (item.product.originalPrice) {
        const discount = (item.product.originalPrice - item.product.price) * item.quantity;
        return sum + discount;
      }
      return sum;
    }, 0);

    // Tax calculation (8.5% for example)
    const tax = subtotal * 0.085;
    
    // Free shipping over $100, otherwise $9.99
    const shipping = subtotal >= 100 ? 0 : 9.99;
    
    const total = subtotal + tax + shipping;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round(total * 100) / 100,
      savings: Math.round(savings * 100) / 100
    };
  }, [items]);
}

export function useCartSummary(items: CartItem[]) {
  const calculations = useCartCalculations(items);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItemCount = items.length;
  
  return {
    ...calculations,
    itemCount,
    uniqueItemCount,
    isEmpty: items.length === 0,
    qualifiesForFreeShipping: calculations.subtotal >= 100,
    amountForFreeShipping: Math.max(0, 100 - calculations.subtotal)
  };
}
