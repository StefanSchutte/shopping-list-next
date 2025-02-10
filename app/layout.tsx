/*
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SharedStateProvider } from "@/contexts/SharedStateContext";
import Link from "next/link";
import "./globals.css";
import { ShoppingBag, Plus } from 'lucide-react';

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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/!* Logo/Home Link *!/}
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-gray-800 dark:text-white
                                         hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                <span className="font-medium">Shopping List</span>
                            </Link>

                            {/!* Add Item Button *!/}
                            <Link
                                href="/add"
                                className="inline-flex items-center px-4 py-2 rounded-lg
                                         bg-blue-600 text-white font-medium
                                         hover:bg-blue-700 transition-colors
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                         dark:focus:ring-offset-gray-800"
                            >
                                <Plus className="w-5 h-5 mr-1.5" />
                                Add Item
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>
            </div>
        </SharedStateProvider>
        </body>
        </html>
    );
}*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SharedStateProvider } from "@/contexts/SharedStateContext";
import NavBar from "@/components/NavBar";
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <NavBar />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>
            </div>
        </SharedStateProvider>
        </body>
        </html>
    );
}