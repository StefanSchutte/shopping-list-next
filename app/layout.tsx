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