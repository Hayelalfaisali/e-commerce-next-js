import Link from "next/link";

export default function Navbar() {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "Cart", href: "/cart" },
        { label: "Checkout/Shipping", href: "/checkout/shipping" },
        { label: "Checkout/Payment", href: "/checkout/payment" },
        { label: "Checkout/Confirmation", href: "/checkout/confirmation" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "Forget Password", href: "/forget-password" },
        { label: "Logout", href: "/logout" },
        { label: "Admin", href: "/admin" },
        { label: "Gallery", href: "/gallery" },
        { label: "Help", href: "/help" },


    ];
    return (
        <div>
            <nav className="flex justify-between">
                <div className="flex space-x-4">
                    {navItems.map((item) => {
                        const active = item.href === "/";
                        return (
                            <Link className={active ? "text-blue-500" : ""} key={item.label} href={item.href}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
                </div>
    )
}