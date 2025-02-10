import React, { useState } from 'react';
import Item from './Item';
import FilterOptions from './FilterOptions';
import { PackingListProps } from '@/types/types';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

type FilterState = {
    priority: 'all' | 'High' | 'Medium' | 'Low';
    store: string;
    category: string;
    status: string;
};

export default function PackingList({
                                        items,
                                        onDeleteItem,
                                        onToggleItem,
                                        onClearList,
                                    }: PackingListProps) {
    const [sortBy, setSortBy] = useState('input');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priority: 'all',
        store: 'all',
        category: 'all',
        status: 'all'
    });

    // Apply filters first
    const filteredItems = items.filter(item => {
        const priorityMatch = filters.priority === 'all' || item.priority === filters.priority;
        const storeMatch = filters.store === 'all' || item.store === filters.store;
        const categoryMatch = filters.category === 'all' || item.category === filters.category;
        const statusMatch = filters.status === 'all' ||
            (filters.status === 'packed' ? item.packed : !item.packed);

        return priorityMatch && storeMatch && categoryMatch && statusMatch;
    });

    // Then sort the filtered items
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'description-asc':
                return a.description.localeCompare(b.description);
            case 'description-desc':
                return b.description.localeCompare(a.description);
            case 'price-asc':
                return (a.estimatedPrice || 0) - (b.estimatedPrice || 0);
            case 'price-desc':
                return (b.estimatedPrice || 0) - (a.estimatedPrice || 0);
            case 'priority': {
                const priorityValues = {
                    'High': 1,
                    'Medium': 2,
                    'Low': 3
                } as const;
                const aPriority = a.priority ? priorityValues[a.priority as keyof typeof priorityValues] : 3;
                const bPriority = b.priority ? priorityValues[b.priority as keyof typeof priorityValues] : 3;
                return aPriority - bPriority;
            }
            case 'status':
                return Number(a.packed) - Number(b.packed);
            default:
                return 0;
        }
    });

    const handleFilterChange = (filterType: keyof FilterState, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            priority: 'all',
            store: 'all',
            category: 'all',
            status: 'all'
        });
        setSortBy('input');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Shopping List
                </h2>

                {items.length > 0 && (
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200
                                 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600
                                 transition-colors duration-200"
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Options
                        {showFilters ? (
                            <ChevronUp className="w-4 h-4 ml-2" />
                        ) : (
                            <ChevronDown className="w-4 h-4 ml-2" />
                        )}
                    </button>
                )}
            </div>

            {/* Enhanced Filter Options */}
            {items.length > 0 && (
                <FilterOptions
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onClearList={onClearList}
                    isVisible={showFilters}
                    items={items}
                    selectedFilters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            )}

            {/* Items List */}
            <div className="space-y-4 mt-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                        <div className="w-16 h-16 mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Your shopping list is empty</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Add some items to get started!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedItems.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                No items match the selected filters
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
                )}
            </div>
        </div>
    );
}