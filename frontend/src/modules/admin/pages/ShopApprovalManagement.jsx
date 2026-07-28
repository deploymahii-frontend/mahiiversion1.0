// src/modules/admin/pages/ShopApprovalManagement.jsx

import { useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";

export default function ShopApprovalManagement() {
    const [search, setSearch] = useState("");
    const [shops, setShops] = useState([]);

    const filteredShops = shops.filter(shop =>
        shop.name?.toLowerCase().includes(search.toLowerCase()) ||
        shop.owner?.toLowerCase().includes(search.toLowerCase())
    );

    function updateStatus(id, status) {
        setShops(previous =>
            previous.map(shop =>
                shop._id === id ? { ...shop, status } : shop
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Shop Approval Management</h1>
                        <p className="mt-2 text-gray-500">Review and approve new shop registrations.</p>
                    </div>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search shop requests..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Shop Name</th>
                                <th className="p-4 text-left">Owner</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShops.map(shop => (
                                <tr key={shop._id} className="border-b">
                                    <td className="p-4">{shop.name}</td>
                                    <td className="p-4">{shop.owner}</td>
                                    <td className="p-4">{shop.category}</td>
                                    <td className="p-4">{shop.status}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateStatus(shop._id, "approved")}
                                                className="rounded-lg bg-green-600 p-2 text-white"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(shop._id, "rejected")}
                                                className="rounded-lg bg-red-600 p-2 text-white"
                                            >
                                                <FaTimes />
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
