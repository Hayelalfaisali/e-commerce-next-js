import { AuthProvider } from "../contexts/AuthContext";
import "../globals.css";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

                    <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
                        <div className="w-full max-w-md">
                            <AuthProvider>
                                {children}
                            </AuthProvider>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </body>
        </html>
    );
}