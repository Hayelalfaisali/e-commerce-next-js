import { Metadata } from "next";

type Props = {
    params: Promise<{
        category: string;
        productId: string;
    }>;
    searchParams: Promise<{
        color?: string;
        size?: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, productId } = await params;
    
    return {
        title: `Product ${productId} | ${category} | ShopHub`,
        description: `Discover amazing ${category} products. Product ID: ${productId}`,
    };
}

export default async function ProductDetails({ params, searchParams }: Props) {
    // Simulate slow data fetch (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const { category, productId } = await params;
    const { color, size } = await searchParams;
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Product Image</span>
                    </div>
                    
                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            Product {productId}
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            Category: <span className="font-semibold">{category}</span>
                        </p>
                        
                        {/* Search Params Display */}
                        {(color || size) && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Selected Options:</h3>
                                {color && <p>Color: <span className="text-blue-600">{color}</span></p>}
                                {size && <p>Size: <span className="text-blue-600">{size}</span></p>}
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-green-600">$99.99</span>
                        </div>
                        
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}