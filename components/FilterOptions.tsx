import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { ShoppingItem } from '@/types/types';

type Priority = 'High' | 'Medium' | 'Low';
type FilterState = {
    priority: 'all' | Priority;
    store: string;
    category: string;
    status: string;
};

interface EnhancedFilterOptionsProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    onClearList: () => void;
    isVisible: boolean;
    items: ShoppingItem[];
    selectedFilters: FilterState;
    onFilterChange: (filterType: keyof FilterState, value: string) => void;
    onResetFilters: () => void;
}

export default function FilterOptions({
                                          sortBy,
                                          onSortChange,
                                          onClearList,
                                          isVisible,
                                          items,
                                          selectedFilters,
                                          onFilterChange,
                                          onResetFilters
                                      }: EnhancedFilterOptionsProps) {
    if (!isVisible) return null;

    const stores = ['all', ...Array.from(new Set(items.map(item => item.store).filter(Boolean) as string[]))];

    const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 animate-fade-in">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sort Options */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Sort By
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-colors duration-200"
                    >
                        <option value="input">Input order</option>
                        <option value="description-asc">Name (A-Z)</option>
                        <option value="description-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>

                {/* Priority Filter */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        Priority
                    </label>
                    <select
                        value={selectedFilters.priority}
                        onChange={(e) => onFilterChange('priority', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-colors duration-200"
                    >
                        <option value="all">All Priorities</option>
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>

                {/* Store Filter */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        Store
                    </label>
                    <select
                        value={selectedFilters.store}
                        onChange={(e) => onFilterChange('store', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-colors duration-200"
                    >
                        <option value="all">All Stores</option>
                        {stores.slice(1).map(store => (
                            <option key={store} value={store}>{store}</option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        Category
                    </label>
                    <select
                        value={selectedFilters.category}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-colors duration-200"
                    >
                        <option value="all">All Categories</option>
                        {categories.slice(1).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([key, value]) => (
                    value !== 'all' && (
                        <span
                            key={key}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm
                                     bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                            {key}: {value}
                            <button
                                onClick={() => onFilterChange(key as keyof FilterState, 'all')}
                                className="ml-2 hover:text-blue-900 dark:hover:text-blue-200"
                            >
                                ×
                            </button>
                        </span>
                    )
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onResetFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300
                             hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    Reset Filters
                </button>

                <button
                    onClick={onClearList}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium
                             rounded-lg transition-colors duration-200 focus:outline-none
                             focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Clear List
                </button>
            </div>
        </div>
    );
}