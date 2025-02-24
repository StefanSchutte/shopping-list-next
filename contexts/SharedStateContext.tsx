'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { ShoppingItem, SharedStateContextProps } from '@/types/types';
import AuthModal from '@/components/AuthModal';

interface ExtendedSharedStateContextProps extends SharedStateContextProps {
    user: User | null;
    loading: boolean;
}

const SharedStateContext = createContext<ExtendedSharedStateContextProps | null>(null);

export function SharedStateProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Auth listener
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch items when user changes
    useEffect(() => {
        if (user) {
            fetchItems();
        } else {
            setItems([]);
        }
    }, [user]);

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('shopping_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const transformedItems: ShoppingItem[] = (data || []).map(item => ({
                id: item.id,
                description: item.description,
                quantity: item.quantity,
                category: item.category,
                unit: item.unit,
                priority: item.priority,
                store: item.store,
                estimatedPrice: item.estimated_price,
                notes: item.notes,
                packed: item.packed
            }));

            setItems(transformedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleAddItem = async (item: Omit<ShoppingItem, 'id'>) => {
        try {
            const transformedItem = {
                user_id: user?.id,
                description: item.description,
                quantity: item.quantity,
                category: item.category,
                unit: item.unit,
                priority: item.priority,
                store: item.store,
                estimated_price: item.estimatedPrice,
                notes: item.notes,
                packed: item.packed
            };

            const { data, error } = await supabase
                .from('shopping_items')
                .insert([transformedItem])
                .select()
                .single();

            if (error) throw error;

            const newItem: ShoppingItem = {
                id: data.id,
                description: data.description,
                quantity: data.quantity,
                category: data.category,
                unit: data.unit,
                priority: data.priority,
                store: data.store,
                estimatedPrice: data.estimated_price,
                notes: data.notes,
                packed: data.packed
            };

            setItems(prev => [newItem, ...prev]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (id: number) => {
        try {
            const { error } = await supabase
                .from('shopping_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleToggleItem = async (id: number) => {
        try {
            const item = items.find(i => i.id === id);
            if (!item) return;

            const { error } = await supabase
                .from('shopping_items')
                .update({ packed: !item.packed })
                .eq('id', id);

            if (error) throw error;
            setItems(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, packed: !item.packed } : item
                )
            );
        } catch (error) {
            console.error('Error toggling item:', error);
        }
    };

    const handleClearList = async () => {
        try {
            const { error } = await supabase
                .from('shopping_items')
                .delete()
                .eq('user_id', user?.id);

            if (error) throw error;
            setItems([]);
        } catch (error) {
            console.error('Error clearing list:', error);
        }
    };

    const value: ExtendedSharedStateContextProps = {
        items,
        user,
        loading,
        addItem: handleAddItem,
        deleteItem: handleDeleteItem,
        toggleItem: handleToggleItem,
        clearItems: handleClearList,
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <SharedStateContext.Provider value={value}>
            {user ? children : <AuthModal />}
        </SharedStateContext.Provider>
    );
}

export function useSharedState(): ExtendedSharedStateContextProps {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error('useSharedState must be used within a SharedStateProvider');
    }
    return context;
}