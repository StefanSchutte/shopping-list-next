'use client';

import React, { useState } from 'react';
import { ShoppingItem } from '@/types/types';

interface ItemProps {
    item: ShoppingItem;
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
}

export default function Item({ item, onDeleteItem, onToggleItem }: ItemProps) {
    const [showDetails, setShowDetails] = useState(false);

    // Format price to 2 decimal places if it exists
    const formattedPrice = item.estimatedPrice
        ? `$${item.estimatedPrice.toFixed(2)}`
        : undefined;

    return (
        <div className="mb-3 bg-white rounded-lg shadow-md w-full overflow-hidden">
            {/* Main item row */}
            <div className="flex items-center p-3">
                <button
                    onClick={() => onToggleItem(item.id)}
                    className={`w-8 h-8 border rounded-full flex items-center justify-center mr-3 
                        ${item.packed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                    {item.packed && '✔'}
                </button>

                <div className="flex-1">
                    <div className="flex items-start">
                        <div className="flex-1">
                            <p className={`text-base font-medium ${item.packed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {item.description}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{item.quantity} {item.unit || 'x'}</span>
                                <span>•</span>
                                <span>{item.category}</span>
                                {item.priority && (
                                    <>
                                        <span>•</span>
                                        <span className={`
                                            ${item.priority === 'High' ? 'text-red-500' : ''}
                                            ${item.priority === 'Medium' ? 'text-yellow-500' : ''}
                                            ${item.priority === 'Low' ? 'text-green-500' : ''}
                                        `}>
                                            {item.priority}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                                hover:bg-gray-200 transition-colors"
                    >
                        <span className="text-gray-600">{showDetails ? '▼' : '▶'}</span>
                    </button>
                    <button
                        onClick={() => onDeleteItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center
                                hover:bg-red-600 transition-colors"
                    >
                        <span className="text-white">❌</span>
                    </button>
                </div>
            </div>

            {/* Expandable details section */}
            {showDetails && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-100">
                    <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                        {item.store && (
                            <div>
                                <span className="font-medium">Store: </span>
                                {item.store}
                            </div>
                        )}

                        {formattedPrice && (
                            <div className="text-sm font-medium text-gray-600">
                            <span className="font-medium">Price: </span>
                                {formattedPrice}
                            </div>
                        )}

                        {item.notes && (
                            <div>
                                <span className="font-medium">Notes: </span>
                                {item.notes}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}