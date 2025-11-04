'use client';

import Link from 'next/link';
import { CartItem as CartItemType } from '@/app/contexts/CartContext';
import { useCart } from '@/app/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const itemTotal = product.price * quantity;
  const originalTotal = product.originalPrice ? product.originalPrice * quantity : null;
  const savings = originalTotal ? originalTotal - itemTotal : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Product Image */}
        <div className="shrink-0">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg hover:opacity-75 transition-opacity"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1">
              <Link 
                href={`/products/${product.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>
              
              {/* Variants */}
              <div className="flex flex-wrap gap-4 mt-3">
                {selectedColor && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Color:</span>
                    <span className="ml-1 capitalize">{selectedColor}</span>
                  </div>
                )}
                {selectedSize && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Size:</span>
                    <span className="ml-1">{selectedSize}</span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price and Controls */}
            <div className="flex flex-col items-end space-y-4">
              {/* Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${itemTotal.toFixed(2)}
                </div>
                {originalTotal && (
                  <div className="text-sm text-gray-500 line-through">
                    ${originalTotal.toFixed(2)}
                  </div>
                )}
                {savings > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Save ${savings.toFixed(2)}
                  </div>
                )}
                <div className="text-sm text-gray-500 mt-1">
                  ${product.price.toFixed(2)} each
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
