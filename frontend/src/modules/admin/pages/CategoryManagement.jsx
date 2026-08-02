// src/modules/admin/pages/CategoryManagement.jsx

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "@/services/api";

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const response = await api.get("/categories");
                setCategories(response?.data?.data || response?.data || []);
            } catch (err) {
                setError(err?.response?.data?.message || "Unable to load categories");
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    async function addCategory() {
        if (!newCategory.trim()) return;

        try {
            const payload = {
                name: newCategory.trim(),
                slug: newCategory.trim().toLowerCase().replace(/\s+/g, "-"),
            };

            const response = await api.post("/categories", payload);
            setCategories(prev => [response.data.data, ...prev]);
            setNewCategory("");
            setError("");
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to create category");
        }
    }

    async function removeCategory(id) {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(previous => previous.filter(category => category._id !== id));
            setError("");
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to delete category");
        }
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
