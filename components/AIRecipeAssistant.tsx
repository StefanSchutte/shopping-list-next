import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSharedState } from '@/contexts/SharedStateContext';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { ShoppingItem } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

const AIRecipeAssistant = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<{
        title?: string;
        ingredients?: Array<{
            item: string;
            quantity: number;
            unit: string;
            category: string;
        }>;
        instructions?: string[];
        tips?: string[];
    } | null>(null);

    const router = useRouter();
    const { addItem } = useSharedState();

    const handleAIRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });

            const rawText = await response.text();

            if (!response.ok) {
                throw new Error(`API error: ${rawText}`);
            }

            try {
                const data = JSON.parse(rawText);
                setAiResponse(data);
            } catch (jsonError) {
                console.error('JSON parsing error:', jsonError);
                setError('Invalid JSON response from server');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'Failed to generate recipe');
        } finally {
            setLoading(false);
        }
    };

    const addIngredientsToList = () => {
        if (!aiResponse?.ingredients) return;

        aiResponse.ingredients.forEach(ingredient => {
            const newItem: ShoppingItem = {
                id: uuidv4(),
                description: ingredient.item,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                category: ingredient.category,
                packed: false,
                priority: "AI Suggestion",
                notes: `From AI recipe: "${aiResponse.title}"`
            };

            addItem(newItem);
        });

        router.push('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-2">
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to List
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-2">
                <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-8 h-8 text-purple-600" />
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        AI Recipe Assistant
                    </h1>
                </div>

                <form onSubmit={handleAIRequest} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            What would you like to cook?
                        </label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter a dish or ingredients you have..."
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !query}
                        className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? 'Generating Recipe...' : 'Get AI Suggestions'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
                        {error}
                    </div>
                )}

                {aiResponse && (
                    <div className="mt-8 space-y-6 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-purple-600 h-5 w-5" />
                            <h2 className="text-xl font-medium text-purple-800 dark:text-purple-300">
                                {aiResponse.title}
                            </h2>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2 mb-3">
                                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 py-1 px-2 rounded-full">AI Suggested</span>
                                Ingredients:
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                {aiResponse.ingredients?.map((ingredient, i) => (
                                    <li key={i} className="pl-2 border-l-2 border-purple-300 dark:border-purple-700">
                                        <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span> {ingredient.item}
                                        <span className="text-xs text-purple-600 dark:text-purple-400 ml-2 italic">({ingredient.category})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2 mb-3">
                                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 py-1 px-2 rounded-full">AI Suggested</span>
                                Instructions:
                            </h3>
                            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                                {aiResponse.instructions?.map((step, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <div>{step}</div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {aiResponse.tips && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-yellow-400">
                                <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-400 flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 py-1 px-2 rounded-full">Chef&#39;s Tips</span>
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                    {aiResponse.tips.map((tip, i) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={addIngredientsToList}
                            className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <Sparkles className="h-5 w-5" />
                            Add AI Ingredients to Shopping List
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIRecipeAssistant;