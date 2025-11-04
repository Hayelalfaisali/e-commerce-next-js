'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'customer' | 'admin';
    redirectTo?: string;
}

export default function ProtectedRoute({ 
    children, 
    requiredRole,
    redirectTo = '/login' 
}: ProtectedRouteProps) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('ProtectedRoute check:', { isLoading, isAuthenticated, user: user?.email, requiredRole });
        
        if (!isLoading) {
            if (!isAuthenticated) {
                console.log('Not authenticated, redirecting to:', redirectTo);
                router.push(redirectTo);
                return;
            }

            if (requiredRole && user?.role !== requiredRole) {
                console.log('Wrong role, user role:', user?.role, 'required:', requiredRole);
                // Redirect based on user role
                if (user?.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }
                return;
            }
            
            console.log('Access granted to protected route');
        }
    }, [isAuthenticated, isLoading, user, requiredRole, router, redirectTo]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
                    <p className="text-gray-600">Please wait while we verify your authentication.</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated or wrong role
    if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
        return null;
    }

    return <>{children}</>;
}
