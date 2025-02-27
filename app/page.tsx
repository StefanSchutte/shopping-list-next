'use client';

import { useSharedState } from '@/contexts/SharedStateContext';
import PackingList from '@/components/PackingList';
import Stats from '@/components/Stats';
import RecipeFAB from "@/components/RecipeFAB";

export default function Home() {
  const { items, deleteItem, toggleItem, clearItems } = useSharedState();

  return (
      <div className="max-w-4xl mx-auto">
        <PackingList
            items={items}
            onDeleteItem={deleteItem}
            onToggleItem={toggleItem}
            onClearList={clearItems}
        />
        <Stats items={items} />
          <RecipeFAB />
      </div>
  );
}