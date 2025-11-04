import ProtectedRoute from '@/app/components/ProtectedRoute';
import { DashboardSidebar } from './components';
import { AuthProvider } from '@/app/contexts/AuthContext';
import '../../globals.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
    analytics: React.ReactNode;
    inventory: React.ReactNode;
    orders: React.ReactNode;
    users: React.ReactNode;
}

export default function DashboardLayout({
    children,
    analytics,
    inventory,
    orders,
    users
}: DashboardLayoutProps) {
    return (
        <html>
            <body>
                <AuthProvider>
                    <ProtectedRoute requiredRole="admin">
                        <div className="min-h-screen bg-gray-50 flex">
                            <DashboardSidebar />
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <main className="flex-1 overflow-y-auto">
                                        {children}
                                        {analytics}
                                        {inventory}
                                        {orders}
                                        {users}
                                </main>
                            </div>
                        </div>
                    </ProtectedRoute>
                </AuthProvider>
            </body>
        </html>
    );
}