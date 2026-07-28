// src/modules/shopOwner/pages/ShopProfileSettings.jsx

import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function ShopProfileSettings() {
    const [shop, setShop] = useState({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        operatingHours: "",
    });

    function updateField(key, value) {
        setShop(previous => ({
            ...previous,
            [key]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Save settings action
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-5 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Shop Profile Settings</h1>
                    <p className="mt-2 text-gray-500">Update shop details and contact information.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Shop Name</label>
                            <input
                                value={shop.name}
                                onChange={e => updateField("name", e.target.value)}
                                className="w-full rounded-2xl border px-4 py-3"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Phone Number</label>
                            <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                                <FaPhone className="text-gray-400" />
                                <input
                                    value={shop.phone}
                                    onChange={e => updateField("phone", e.target.value)}
                                    className="w-full border-none bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Shop Description</label>
                        <textarea
                            value={shop.description}
                            onChange={e => updateField("description", e.target.value)}
                            className="w-full rounded-2xl border p-4"
                            rows={4}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Address</label>
                            <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <input
                                    value={shop.address}
                                    onChange={e => updateField("address", e.target.value)}
                                    className="w-full border-none bg-transparent outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                            <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                                <FaEnvelope className="text-gray-400" />
                                <input
                                    value={shop.email}
                                    onChange={e => updateField("email", e.target.value)}
                                    className="w-full border-none bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Operating Hours</label>
                        <div className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                            <FaClock className="text-gray-400" />
                            <input
                                value={shop.operatingHours}
                                onChange={e => updateField("operatingHours", e.target.value)}
                                className="w-full border-none bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
