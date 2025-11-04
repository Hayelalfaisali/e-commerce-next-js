'use client';

import Link from 'next/link';
import { useCartSummary } from '../hooks';
import { CartItem } from '@/app/contexts/CartContext';

interface CartSummaryProps {
  items: CartItem[];
  showCheckoutButton?: boolean;
}

export default function CartSummary({ items, showCheckoutButton = true }: CartSummaryProps) {
  const summary = useCartSummary(items);

  if (summary.isEmpty) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Items Count */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>Items ({summary.itemCount})</span>
        <span>${summary.subtotal.toFixed(2)}</span>
      </div>

      {/* Savings */}
      {summary.savings > 0 && (
        <div className="flex justify-between text-sm text-green-600 mb-4">
          <span>You Save</span>
          <span>-${summary.savings.toFixed(2)}</span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>Shipping</span>
        <span>
          {summary.shipping === 0 ? (
            <span className="text-green-600 font-medium">FREE</span>
          ) : (
            `$${summary.shipping.toFixed(2)}`
          )}
        </span>
      </div>

      {/* Free Shipping Progress */}
      {!summary.qualifiesForFreeShipping && summary.amountForFreeShipping > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800 mb-2">
            Add ${summary.amountForFreeShipping.toFixed(2)} more for FREE shipping!
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(summary.subtotal / 100) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tax */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>Tax</span>
        <span>${summary.tax.toFixed(2)}</span>
      </div>

      <hr className="my-4" />

      {/* Total */}
      <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span>${summary.total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center block"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors text-center block"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure Checkout
      </div>
    </div>
  );
}
