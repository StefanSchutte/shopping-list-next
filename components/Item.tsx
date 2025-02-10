import React, { useState } from 'react';
import { ItemProps } from '@/types/types';
import { ChevronDown, ChevronUp, Trash2, Store, DollarSign, StickyNote } from 'lucide-react';

export default function Item({ item, onDeleteItem, onToggleItem }: ItemProps) {
    const [showDetails, setShowDetails] = useState(false);

    const formattedPrice = item.estimatedPrice
        ? `$${item.estimatedPrice.toFixed(2)}`
        : undefined;

    const getPriorityColor = (priority: string | undefined) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Low':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            default:
                return '';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600
                      overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* Main item row */}
            <div className="p-4">
                <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                        onClick={() => onToggleItem(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center 
                                  transition-colors duration-200 flex-shrink-0
                                  ${
                            item.packed
                                ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600'
                                : 'border-gray-300 dark:border-gray-500 hover:border-gray-400'
                        }`}
                    >
                        {item.packed && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    {/* Item content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className={`text-base font-medium ${
                                    item.packed
                                        ? 'text-gray-400 dark:text-gray-500 line-through'
                                        : 'text-gray-900 dark:text-white'
                                }`}>
                                    {item.description}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {item.quantity} {item.unit || 'x'}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {item.category}
                                    </span>
                                    {item.priority && (
                                        <>
                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                            <span className={`text-sm px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                                                {item.priority}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400
                                             dark:hover:text-gray-200 rounded-lg hover:bg-gray-100
                                             dark:hover:bg-gray-600 transition-colors duration-200"
                                    aria-label="Toggle details"
                                >
                                    {showDetails ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => onDeleteItem(item.id)}
                                    className="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400
                                             dark:hover:text-red-300 rounded-lg hover:bg-red-50
                                             dark:hover:bg-red-900/30 transition-colors duration-200"
                                    aria-label="Delete item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable details section */}
            {showDetails && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {item.store && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <Store className="w-4 h-4" />
                                <span className="text-sm">{item.store}</span>
                            </div>
                        )}

                        {formattedPrice && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-sm">{formattedPrice}</span>
                            </div>
                        )}

                        {item.notes && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300
                                          col-span-full">
                                <StickyNote className="w-4 h-4" />
                                <span className="text-sm">{item.notes}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}