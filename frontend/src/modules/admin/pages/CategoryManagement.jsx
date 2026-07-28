// src/modules/admin/pages/CategoryManagement.jsx

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    function addCategory() {
        if (!newCategory.trim()) return;
        setCategories(previous => [
            ...previous,
            { _id: `${Date.now()}`, name: newCategory.trim(), shops: 0 },
        ]);
        setNewCategory("");
    }

    function removeCategory(id) {
        setCategories(previous => previous.filter(category => category._id !== id));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Category Management</h1>
                        <p className="mt-2 text-gray-500">Control shop categories across the marketplace.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            value={newCategory}
                            onChange={event => setNewCategory(event.target.value)}
                            className="rounded-3xl border bg-white px-4 py-3"
                            placeholder="New category name"
                        />
                        <button
                            onClick={addCategory}
                            className="rounded-3xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Shops</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category._id} className="border-b">
                                    <td className="p-4">{category.name}</td>
                                    <td className="p-4">{category.shops}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg bg-blue-600 p-2 text-white">
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => removeCategory(category._id)}
                                                className="rounded-lg bg-red-600 p-2 text-white"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
