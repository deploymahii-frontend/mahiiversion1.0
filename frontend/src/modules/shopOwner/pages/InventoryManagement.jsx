// src/modules/shopOwner/pages/InventoryManagement.jsx

import { useState } from "react";
import { FaSearch, FaBoxes, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function InventoryManagement() {
    const [search, setSearch] = useState("");
    const [inventory, setInventory] = useState([]);

    const filteredInventory = inventory.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Inventory Management</h1>
                        <p className="mt-2 text-gray-500">Track stock and restock levels.</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-3xl border bg-white px-4 py-3 shadow-sm">
                        <FaSearch className="text-gray-400" />
                        <input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Search inventory items..."
                            className="w-full border-none bg-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaBoxes className="text-3xl text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Total Items</p>
                                <p className="mt-2 text-3xl font-bold">{inventory.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaArrowUp className="text-3xl text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">Restock Requests</p>
                                <p className="mt-2 text-3xl font-bold">12</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaArrowDown className="text-3xl text-red-600" />
                            <div>
                                <p className="text-sm text-gray-500">Low Stock Items</p>
                                <p className="mt-2 text-3xl font-bold">8</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Item</th>
                                <th className="p-4 text-left">Stock</th>
                                <th className="p-4 text-left">Unit</th>
                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item._id} className="border-b">
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.quantity}</td>
                                    <td className="p-4">{item.unit}</td>
                                    <td className="p-4">
                                        <span className={`rounded-full px-3 py-1 text-sm ${item.quantity < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                            {item.quantity < 10 ? "Low stock" : "Healthy"}
                                        </span>
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
