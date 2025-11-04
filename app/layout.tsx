import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";

export const metadata: Metadata = {
  title: "ShopHub - Modern E-commerce Platform",
  description: "A modern e-commerce platform with authentication and admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
