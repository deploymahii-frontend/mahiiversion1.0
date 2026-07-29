// src/modules/shopOwner/components/AddEditProductModal.jsx

import { useEffect, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

const defaultForm = {
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    isVeg: true,
    available: true,
};

export default function AddEditProductModal({
    open,
    product = null,
    onClose,
    onSubmit,
}) {
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (product) {
            setForm({
                ...product,
            });
        } else {
            setForm(defaultForm);
        }
    }, [product]);

    if (!open) {
        return null;
    }

    function update(key, value) {
        setForm(previous => ({
            ...previous,
            [key]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit?.(form);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-2xl font-bold">{product ? "Edit Product" : "Add Product"}</h2>
                    <button onClick={onClose} className="rounded-lg border p-2">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        className="w-full rounded-xl border p-3"
                        required
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        value={form.description}
                        onChange={e => update("description", e.target.value)}
                        className="w-full rounded-xl border p-3"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <select
                            value={form.category}
                            onChange={e => update("category", e.target.value)}
                            className="rounded-xl border p-3"
                            required
                        >
                            <option value="">Category</option>
                            <option>Mess</option>
                            <option>Restaurant</option>
                            <option>Cafe</option>
                            <option>Bakery</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={e => update("price", e.target.value)}
                            className="rounded-xl border p-3"
                            required
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="number"
                            placeholder="Stock Quantity"
                            value={form.stock}
                            onChange={e => update("stock", e.target.value)}
                            className="rounded-xl border p-3"
                            required
                        />

                        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border p-3">
                            <FaUpload />
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={e => update("image", e.target.files?.[0] || null)}
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="flex items-center justify-between rounded-xl border p-4">
                            <span>Veg Product</span>
                            <input
                                type="checkbox"
                                checked={form.isVeg}
                                onChange={e => update("isVeg", e.target.checked)}
                            />
                        </label>
                        <label className="flex items-center justify-between rounded-xl border p-4">
                            <span>Available</span>
                            <input
                                type="checkbox"
                                checked={form.available}
                                onChange={e => update("available", e.target.checked)}
                            />
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border px-6 py-3 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            {product ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
