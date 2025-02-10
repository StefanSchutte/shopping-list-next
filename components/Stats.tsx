'use client';

import React from 'react';
import { StatsProps } from '@/types/types';

export default function Stats({ items }: StatsProps) {
    if (!items.length) {
        return (
            <div className="p-4 mt-4 text-center">
                <p className="text-gray-400 text-sm italic">
                    Start adding items to your list.
                </p>
            </div>
        );
    }

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <div className="p-4 mt-4 text-center">
            <p className="text-gray-400 text-sm italic">
                {percentage === 100
                    ? "You got everything!"
                    : `You have ${numItems} items on your list, and obtained ${numPacked} (${percentage}%)`}
            </p>
        </div>
    );
}