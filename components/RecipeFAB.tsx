import React from 'react';
import { Utensils } from 'lucide-react';
import Link from 'next/link';

const RecipeFAB = () => {
    return (
        <Link
            href="/recipe"
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full
                 flex items-center justify-center shadow-lg hover:bg-blue-700
                 transition-colors duration-200 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-offset-2 z-50"
            aria-label="Add Recipe"
        >
            <Utensils className="w-6 h-6 text-white" />
        </Link>
    );
};

export default RecipeFAB;