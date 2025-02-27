import React, { useState } from "react";
import type { ShoppingItem, FormProps } from "@/types/types";
import { v4 as uuidv4 } from 'uuid';

export default function Form({ onAddItems }: FormProps) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [unit, setUnit] = useState("");
    const [priority, setPriority] = useState("");
    const [store, setStore] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState("");
    const [notes, setNotes] = useState("");

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (!description || !category) return;

        const newItem: ShoppingItem = {
            id: uuidv4(),
            description,
            quantity,
            category,
            unit: unit || undefined,
            priority: priority || undefined,
            store: store || undefined,
            estimatedPrice: estimatedPrice ? Number(estimatedPrice) : undefined,
            notes: notes || undefined,
            packed: false,
        };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
        setCategory("");
        setUnit("");
        setPriority("");
        setStore("");
        setEstimatedPrice("");
        setNotes("");
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Required Fields Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Item Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            placeholder="Enter item name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                            id="category"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Produce">Produce</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Meat">Meat</option>
                            <option value="Pantry">Pantry</option>
                            <option value="Frozen">Frozen</option>
                            <option value="Household">Household</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Quantity and Unit Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Quantity
                        </label>
                        <select
                            id="quantity"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                            {Array.from({ length: 20 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Unit
                        </label>
                        <select
                            id="unit"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option value="">Select unit</option>
                            <option value="pieces">pieces</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="l">liters</option>
                            <option value="ml">ml</option>
                            <option value="pack">pack</option>
                        </select>
                    </div>
                </div>

                {/* Priority and Store Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Priority
                        </label>
                        <select
                            id="priority"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="store" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Store
                        </label>
                        <input
                            type="text"
                            id="store"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            placeholder="Enter store name"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                        />
                    </div>
                </div>

                {/* Price and Notes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="estimatedPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Estimated Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">$</span>
                            <input
                                type="number"
                                id="estimatedPrice"
                                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                         transition-colors duration-200"
                                placeholder="0.00"
                                value={estimatedPrice}
                                onChange={(e) => setEstimatedPrice(e.target.value)}
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes
                        </label>
                        <input
                            type="text"
                            id="notes"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     transition-colors duration-200"
                            placeholder="Add any notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 transform transition-all duration-200 hover:scale-105"
                    >
                        Add to List
                    </button>
                </div>
            </form>
        </div>
    );
}