// src/modules/shopOwner/pages/ProductManagement.jsx

import { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            category === "all" ? true : product.category === category;
        return matchesSearch && matchesCategory;
    });

    function toggleAvailability(id) {
        setProducts(previous =>
            previous.map(product =>
                product._id === id
                    ? {
                          ...product,
                          available: !product.available,
                      }
                    : product
            )
        );
    }

    function removeProduct(id) {
        setProducts(previous => previous.filter(product => product._id !== id));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Product Management</h1>
                        <p className="mt-2 text-gray-500">Manage your menu and inventory.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                        <FaPlus />
                        Add Product
                    </button>
                </div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-xl border bg-white py-3 pl-11 pr-4"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                        className="rounded-xl border bg-white px-4 py-3"
                    >
                        <option value="all">All Categories</option>
                        <option value="Mess">Mess</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
                </div>

                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Stock</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product._id} className="border-b">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-xl object-cover"
                                            />
                                            <span className="font-semibold">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">{product.category}</td>
                                    <td className="p-4">₹{product.price}</td>
                                    <td className="p-4">{product.stock}</td>
                                    <td className="p-4">
                                        <button onClick={() => toggleAvailability(product._id)}>
                                            {product.available ? (
                                                <FaToggleOn className="text-3xl text-green-600" />
                                            ) : (
                                                <FaToggleOff className="text-3xl text-gray-400" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg bg-blue-600 p-2 text-white">
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => removeProduct(product._id)}
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
