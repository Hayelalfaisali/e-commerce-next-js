import { notFound } from 'next/navigation';
import { getProductById } from '@/data';
import ProductDetails from '../../components/ProductDetails';

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { productId } = await params;
    const product = getProductById(productId);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li>
                            <a href="/products" className="text-gray-500 hover:text-gray-700">Products</a>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li>
                            <span className="text-gray-900 font-medium">{product.name}</span>
                        </li>
                    </ol>
                </nav>

                <ProductDetails product={product} />
            </div>
        </div>
    );
}