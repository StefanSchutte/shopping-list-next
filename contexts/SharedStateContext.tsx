'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ShoppingItem, SharedStateContextProps } from '@/types/types';

const SharedStateContext = createContext<SharedStateContextProps | null>(null);

export function SharedStateProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    useEffect(() => {
        const storedItems = localStorage.getItem('packingList:items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('packingList:items', JSON.stringify(items));
    }, [items]);

    const handleAddItem = (item: ShoppingItem): void => {
        setItems(prev => [...prev, item]);
    };

    const handleDeleteItem = (id: number): void => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleToggleItem = (id: number): void => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    };

    const handleClearList = (): void => {
        setItems([]);
    };

    const value: SharedStateContextProps = {
        items,
        addItem: handleAddItem,
        deleteItem: handleDeleteItem,
        toggleItem: handleToggleItem,
        clearItems: handleClearList,
    };

    return (
        <SharedStateContext.Provider value={value}>
            {children}
        </SharedStateContext.Provider>
    );
}

export function useSharedState(): SharedStateContextProps {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error('useSharedState must be used within a SharedStateProvider');
    }
    return context;
}