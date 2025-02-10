'use client';

import Link from "next/link";
import { ShoppingBag, Plus, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function NavBar() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Home Link */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-gray-800 dark:text-white
                                 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ShoppingBag className="w-6 h-6" />
                        <span className="font-medium">Shopping List</span>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
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

                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-3 py-2 rounded-lg
                                     text-gray-700 dark:text-gray-200 font-medium
                                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                                     dark:focus:ring-offset-gray-800"
                            aria-label="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}