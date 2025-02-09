'use client';

import React, { useState } from 'react';
import Item from './Item';
import FilterOptions from './FilterOptions';

interface PackingListProps {
    items: { id: number; description: string; quantity: number; packed: boolean }[];
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
    onClearList: () => void;
}

export default function PackingList({
                                        items,
                                        onDeleteItem,
                                        onToggleItem,
                                        onClearList,
                                    }: PackingListProps) {
    const [sortBy, setSortBy] = useState<string>('input');
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'description') {
            return a.description.localeCompare(b.description);
        }
        if (sortBy === 'packed') {
            return Number(a.packed) - Number(b.packed);
        }
        return 0;
    });

    return (
        <div className="p-6 bg-gray-600 rounded-lg shadow-md flex flex-col h-full">
            {items.length > 0 && (
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                             transition-colors self-end flex items-center"
                >
                    <span className="mr-2">{showFilters ? 'Hide' : 'Show'} Options</span>
                    <span className="text-sm">{showFilters ? '▼' : '▶'}</span>
                </button>
            )}

            {items.length > 0 && (
                <FilterOptions
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onClearList={onClearList}
                    isVisible={showFilters}
                />
            )}

            <div className="flex-1 overflow-auto mt-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                        <span className="text-6xl mb-4">📝</span>
                        <p className="text-xl font-semibold mb-2">Your shopping list is empty</p>
                        <p className="text-gray-400">Add some items to get started!</p>
                    </div>
                ) : (
                    sortedItems.map(item => (
                        <Item
                            key={item.id}
                            item={item}
                            onDeleteItem={onDeleteItem}
                            onToggleItem={onToggleItem}
                        />
                    ))
                )}
            </div>
        </div>
    );
}