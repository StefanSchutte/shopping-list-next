export interface ShoppingItem {
    id: number;
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