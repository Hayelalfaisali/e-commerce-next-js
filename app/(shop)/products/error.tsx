"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ProductsError({ 
  error, 
  reset 
}: { 
  error: Error, 
  reset: () => void 
}) {
  const router = useRouter();
  
  const reload = () => {
    startTransition(() => {
      router.refresh(); // Refresh server data
      reset();          // Reset error boundary
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Product Loading Error
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        {error.message || "Something went wrong while loading products"}
      </p>
      <div className="flex gap-4">
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" 
          onClick={reload}
        >
          Try Again
        </button>
        <button 
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700" 
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
