// src/modules/admin/pages/AdminDashboard.jsx

import {
    FaUsers,
    FaStore,
    FaClipboardList,
    FaChartLine,
} from "react-icons/fa";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Shops", value: 124, icon: FaStore, color: "bg-blue-600" },
        { label: "Active Users", value: 8_432, icon: FaUsers, color: "bg-green-600" },
        { label: "Pending Approvals", value: 18, icon: FaClipboardList, color: "bg-yellow-600" },
        { label: "Platform Revenue", value: "₹12.8L", icon: FaChartLine, color: "bg-purple-600" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                        <p className="mt-2 text-gray-500">Overview of marketplace health and operations.</p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map(stat => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                        <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} rounded-3xl p-4 text-white`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Recent Approval Activity</h2>
                        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
                            Approval activity chart placeholder
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">System Alerts</h2>
                        <div className="space-y-4">
                            <div className="rounded-3xl border p-5">
                                <p className="font-semibold">Subscription renewal reminder</p>
                                <p className="mt-2 text-gray-500">3 shops require plan renewal this week.</p>
                            </div>
                            <div className="rounded-3xl border p-5">
                                <p className="font-semibold">High traffic notice</p>
                                <p className="mt-2 text-gray-500">Peak load expected between 7pm and 9pm today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
