'use client';

import React, { createContext, useEffect, useState } from 'react';
import { ShoppingItem, SharedStateContextProps } from '@/types/types';

export const SharedStateContext = createContext<SharedStateContextProps | null>(null);

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

    const handleAddItems = (item: ShoppingItem): void => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const handleDeleteItem = (id: number): void => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleToggleItem = (id: number): void => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    };

    const handleClearList = (): void => {
        setItems([]);
    };

    const sharedStateValue: SharedStateContextProps = {
        items,
        addItem: handleAddItems,
        deleteItem: handleDeleteItem,
        toggleItem: handleToggleItem,
        clearItems: handleClearList,
    };

    return (
        <SharedStateContext.Provider value={sharedStateValue}>
            {children}
        </SharedStateContext.Provider>
    );
}

export function useSharedState(): SharedStateContextProps {
    const context = React.useContext(SharedStateContext);
    if (!context) {
        throw new Error("useSharedState must be used within a SharedStateProvider");
    }
    return context;
}