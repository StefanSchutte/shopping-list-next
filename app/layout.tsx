import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SharedStateProvider } from "@/contexts/SharedStateContext";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Shopping List App",
    description: "A simple shopping list application",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SharedStateProvider>
            <div className="min-h-screen bg-black">
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-white hover:text-gray-300"
                        >
                            Shopping List
                        </Link>
                        <Link
                            href="/add"
                            className="text-white hover:text-gray-300"
                        >
                            Add Item
                        </Link>
                    </div>
                </nav>
                <main className="container mx-auto p-4">
                    {children}
                </main>
            </div>
        </SharedStateProvider>
        </body>
        </html>
    );
}