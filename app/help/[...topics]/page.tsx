export default async function Help({ params }: { params: Promise<{ topics: string[] }> }) {
    const { topics } = await params;
    
    const renderHelpContent = () => {
        if (!topics || topics.length === 0) {
            return (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Help Center</h2>
                    <p>Welcome to our help center. Browse topics below:</p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li><a href="/help/getting-started" className="text-blue-600 hover:underline">Getting Started</a></li>
                        <li><a href="/help/orders/tracking" className="text-blue-600 hover:underline">Order Tracking</a></li>
                        <li><a href="/help/shipping/returns/policy" className="text-blue-600 hover:underline">Return Policy</a></li>
                    </ul>
                </div>
            );
        }

        if (topics.length === 1) {
            return (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Help: {topics[0]}</h2>
                    <p>Information about {topics[0]}</p>
                </div>
            );
        }

        if (topics.length === 2) {
            return (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Help: {topics[0]} - {topics[1]}</h2>
                    <p>Category: <span className="font-semibold">{topics[0]}</span></p>
                    <p>Topic: <span className="font-semibold">{topics[1]}</span></p>
                </div>
            );
        }

        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Help: {topics.join(" > ")}</h2>
                <div className="space-y-2">
                    <p>Category: <span className="font-semibold">{topics[0]}</span></p>
                    <p>Subcategory: <span className="font-semibold">{topics[1]}</span></p>
                    <p>Topic: <span className="font-semibold">{topics[2]}</span></p>
                    {topics.length > 3 && (
                        <p>Additional segments: <span className="font-semibold">{topics.slice(3).join(", ")}</span></p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {renderHelpContent()}
                
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold mb-2">URL Segments:</h3>
                    <p className="text-sm text-gray-600">
                        {topics ? `[${topics.join(", ")}]` : "No segments"}
                    </p>
                </div>
            </div>
        </div>
    );
}