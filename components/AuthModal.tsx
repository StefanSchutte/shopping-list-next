import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';

export default function AuthModal() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Sign in to Your Shopping List
                </h2>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#3B82F6',
                                    brandAccent: '#2563EB',
                                }
                            }
                        }
                    }}
                    providers={['google']}
                    theme="dark"
                />
            </div>
        </div>
    );
}