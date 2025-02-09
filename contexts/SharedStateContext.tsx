'use client';

import React, { createContext, useEffect, useState } from 'react';

import { ShoppingItem } from '@/types/types';

interface SharedStateContextProps {
    items: ShoppingItem[];
    addItem: (item: ShoppingItem) => void;
    deleteItem: (id: number) => void;
    toggleItem: (id: number) => void;
    clearItems: () => void;
}


export const SharedStateContext = createContext<SharedStateContextProps | null>(null);

export function SharedStateProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ShoppingItem[]>([]);

    // Load items from localStorage when the component mounts
    useEffect(() => {
        const storedItems = localStorage.getItem('packingList:items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    // Save items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('packingList:items', JSON.stringify(items));
    }, [items]);

    function handleAddItems(item: ShoppingItem): void {
        setItems((prevItems) => [...prevItems, item]);
    }

    function handleDeleteItem(id: number): void {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    function handleToggleItem(id: number): void {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearList(): void {
        setItems([]);
    }

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

export function useSharedState() {
    const context = React.useContext(SharedStateContext);
    if (!context) {
        throw new Error("useSharedState must be used within a SharedStateProvider");
    }
    return context;
}