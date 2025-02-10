import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for type safety
export type Database = {
    public: {
        Tables: {
            shopping_items: {
                Row: {
                    id: number;
                    user_id: string;
                    description: string;
                    quantity: number;
                    category: string;
                    unit: string | null;
                    priority: string | null;
                    store: string | null;
                    estimated_price: number | null;
                    notes: string | null;
                    packed: boolean;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['shopping_items']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['shopping_items']['Insert']>;
            };
        };
    };
};