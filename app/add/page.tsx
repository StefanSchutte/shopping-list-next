'use client';

import { useRouter } from 'next/navigation';
import { useSharedState } from '@/contexts/SharedStateContext';
import Form from '@/components/Form';
import { ShoppingItem } from '@/types/types';

export default function AddItem() {
    const { addItem } = useSharedState();
    const router = useRouter();

    function handleAddItemAndNavigate(item: ShoppingItem) {
        addItem(item);
        router.push('/');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Form onAddItems={handleAddItemAndNavigate} />
        </div>
    );
}