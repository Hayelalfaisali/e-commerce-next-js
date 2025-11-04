"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Cart", href: "/cart" },
        { label: "Admin Dashboard", href: "/dashboard" },
        { label: "Gallery", href: "/gallery" },
        { label: "Help", href: "/help/getting-started" },
        { label: "Login", href: "/login" },
    ];
    
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        ShopHub
                    </Link>
                    
                    <div className="flex space-x-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || 
                                           (item.href !== "/" && pathname.startsWith(item.href));
                            
                            return (
                                <Link 
                                    key={item.label} 
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? "text-blue-600 bg-blue-50 font-bold" 
                                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}