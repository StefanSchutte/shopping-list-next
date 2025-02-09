'use client';

import React from 'react';

interface FilterOptionsProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    onClearList: () => void;
    isVisible: boolean;
}

export default function FilterOptions({
                                          sortBy,
                                          onSortChange,
                                          onClearList,
                                          isVisible
                                      }: FilterOptionsProps) {
    if (!isVisible) return null;

    return (
        <div className="flex items-center justify-between mt-4 p-4 bg-gray-700 rounded-lg animate-fade-in text-gray-950">
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="flex-1 h-12 mr-3 px-3 rounded border border-gray-300"
            >
                <option value="input">Sort by input order</option>
                <option value="description">Sort by description</option>
                <option value="packed">Sort by status</option>
            </select>

            <button
                onClick={onClearList}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600
                         transition-colors"
            >
                Clear list
            </button>
        </div>
    );
}