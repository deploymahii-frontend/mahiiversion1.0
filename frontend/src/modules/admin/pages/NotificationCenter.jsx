// src/modules/admin/pages/NotificationCenter.jsx

import { useState } from "react";
import { FaBell, FaBellSlash, FaEnvelope, FaSearch } from "react-icons/fa";

export default function NotificationCenter() {
    const [search, setSearch] = useState("");
    const [notifications, setNotifications] = useState([]);

    const filteredNotifications = notifications.filter(notification =>
        notification.title?.toLowerCase().includes(search.toLowerCase()) ||
        notification.message?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Notification Center</h1>
                        <p className="mt-2 text-gray-500">Manage system alerts and announcements.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="rounded-3xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                            <FaBell /> Send Alert
                        </button>
                        <button className="rounded-3xl bg-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-300">
                            <FaBellSlash /> Mute All
                        </button>
                    </div>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search notifications..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="space-y-6">
                    {filteredNotifications.map(notification => (
                        <div key={notification._id} className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{notification.title}</h2>
                                    <p className="mt-2 text-gray-500">{notification.message}</p>
                                </div>
                                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">{notification.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
