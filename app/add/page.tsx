'use client';

import { useRouter } from 'next/navigation';
import { useSharedState } from '@/contexts/SharedStateContext';
import Form from '@/components/Form';

export default function AddItem() {
    const { addItem } = useSharedState();
    const router = useRouter();

    function handleAddItemAndNavigate(item: { description: string; quantity: number; packed: boolean; id: number }) {
        addItem(item);
        router.push('/');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Form onAddItems={handleAddItemAndNavigate} />
        </div>
    );
}