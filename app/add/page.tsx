'use client';

import { useRouter } from 'next/navigation';
import { useSharedState } from '@/contexts/SharedStateContext';
import Form from '@/components/Form';

interface AddItemType {
    id: number;
    description: string;
    quantity?: number;
    category?: string;
    unit?: string;
    priority?: string;
    store?: string;
    estimatedPrice?: number;
    notes?: string;
    packed: boolean;
}

export default function AddItem() {
    const { addItem } = useSharedState();
    const router = useRouter();

    function handleAddItemAndNavigate(item: AddItemType) {
        addItem(item);
        router.push('/');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Form onAddItems={handleAddItemAndNavigate} />
        </div>
    );
}