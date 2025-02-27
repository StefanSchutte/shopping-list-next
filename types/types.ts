export interface ShoppingItem {
    id: string;
    description: string;
    quantity: number;
    category: string;
    unit?: string;
    priority?: string;
    store?: string;
    estimatedPrice?: number;
    notes?: string;
    packed: boolean;
}

export interface SharedStateContextProps {
    items: ShoppingItem[];
    addItem: (item: ShoppingItem) => void;
    deleteItem: (id: number) => void;
    toggleItem: (id: number) => void;
    clearItems: () => void;
}

export interface FormProps {
    onAddItems: (item: ShoppingItem) => void;
}

export interface ItemProps {
    item: ShoppingItem;
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
}

export interface PackingListProps {
    items: ShoppingItem[];
    onDeleteItem: (id: number) => void;
    onToggleItem: (id: number) => void;
    onClearList: () => void;
}

export interface FilterOptionsProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    onClearList: () => void;
    isVisible: boolean;
    items: ShoppingItem[];
}

export interface StatsProps {
    items: ShoppingItem[];
}