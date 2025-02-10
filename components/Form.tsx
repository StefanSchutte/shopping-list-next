'use client';

import React, { useState } from "react";
import type { ShoppingItem, FormProps } from "@/types/types";

export default function Form({ onAddItems }: FormProps) {
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [category, setCategory] = useState<string>("");
    const [unit, setUnit] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [store, setStore] = useState<string>("");
    const [estimatedPrice, setEstimatedPrice] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        if (!description || !category) return;

        const newItem: ShoppingItem = {
            id: Date.now(),
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

        // Reset form
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
        <div className="bg-gray-600 rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Required Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-bold mb-2 text-white">
                            Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            placeholder="Enter item name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-bold mb-2 text-white">
                            Category
                        </label>
                        <select
                            id="category"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
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

                {/* Quantity and Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-bold mb-2 text-white">
                            Quantity
                        </label>
                        <select
                            id="quantity"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
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

                    <div>
                        <label htmlFor="unit" className="block text-sm font-bold mb-2 text-white">
                            Unit
                        </label>
                        <select
                            id="unit"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
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

                {/* Priority and Store */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="priority" className="block text-sm font-bold mb-2 text-white">
                            Priority
                        </label>
                        <select
                            id="priority"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="store" className="block text-sm font-bold mb-2 text-white">
                            Store
                        </label>
                        <input
                            type="text"
                            id="store"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            placeholder="Enter store name"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                        />
                    </div>
                </div>

                {/* Price and Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="estimatedPrice" className="block text-sm font-bold mb-2 text-white">
                            Estimated Price
                        </label>
                        <input
                            type="number"
                            id="estimatedPrice"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            placeholder="Enter estimated price"
                            value={estimatedPrice}
                            onChange={(e) => setEstimatedPrice(e.target.value)}
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-bold mb-2 text-white">
                            Notes
                        </label>
                        <input
                            type="text"
                            id="notes"
                            className="w-full p-2 border border-gray-300 rounded text-gray-950"
                            placeholder="Add any notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600
                                 transition-colors w-1/2"
                    >
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
}