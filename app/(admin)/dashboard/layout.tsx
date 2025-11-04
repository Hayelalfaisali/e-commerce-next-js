import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute requiredRole="admin">
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </ProtectedRoute>
    );
}