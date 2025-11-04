"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddToCartButtonProps {
    productId: string;
    category: string;
}

export default function AddToCartButton({ productId, category }: AddToCartButtonProps) {
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to cart using push (user can go back)
        router.push("/cart");
        
        setIsAdding(false);
    };

    const handleBuyNow = () => {
        // Navigate to checkout using replace (prevent going back to product)
        router.replace("/checkout/shipping");
    };

    const handleGoBack = () => {
        // Go back to previous page
        router.back();
    };

    return (
        <div className="space-y-3">
            <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {isAdding ? "Adding..." : "Add to Cart"}
            </button>
            
            <button 
                onClick={handleBuyNow}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
                Buy Now
            </button>
            
            <button 
                onClick={handleGoBack}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
                ← Go Back
            </button>
            
            {/* Prefetch example */}
            <button 
                onMouseEnter={() => router.prefetch("/checkout/shipping")}
                onClick={() => router.push("/checkout/shipping")}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
                Quick Checkout (Prefetched)
            </button>
        </div>
    );
}
