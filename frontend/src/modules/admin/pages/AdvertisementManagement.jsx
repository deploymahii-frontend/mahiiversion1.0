// src/modules/admin/pages/AdvertisementManagement.jsx

import { useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

export default function AdvertisementManagement() {
    const [ads, setAds] = useState([]);
    const [search, setSearch] = useState("");

    const filteredAds = ads.filter(ad =>
        ad.title?.toLowerCase().includes(search.toLowerCase()) ||
        ad.shopName?.toLowerCase().includes(search.toLowerCase())
    );

    function removeAd(id) {
        setAds(previous => previous.filter(ad => ad._id !== id));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Advertisement Management</h1>
                        <p className="mt-2 text-gray-500">Manage promotional campaigns and featured ads.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                        <FaPlus /> Add Ad
                    </button>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search campaigns..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="space-y-6">
                    {filteredAds.map(ad => (
                        <div key={ad._id} className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">{ad.title}</h2>
                                    <p className="mt-2 text-gray-500">Shop: {ad.shopName}</p>
                                </div>
                                <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">{ad.status}</span>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <button className="rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => removeAd(ad._id)}
                                    className="rounded-2xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                >
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
