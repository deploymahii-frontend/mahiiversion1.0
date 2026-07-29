// src/modules/admin/pages/PlatformAnalytics.jsx

import { FaChartPie, FaChartLine, FaShoppingCart, FaBell } from "react-icons/fa";

export default function PlatformAnalytics() {
    const metrics = [
        { title: "Daily Orders", value: 1_240, icon: FaShoppingCart, color: "bg-blue-600" },
        { title: "Monthly GMV", value: "₹45.2L", icon: FaChartPie, color: "bg-green-600" },
        { title: "Average Rating", value: "4.7", icon: FaBell, color: "bg-orange-600" },
        { title: "Conversion Rate", value: "23.4%", icon: FaChartLine, color: "bg-purple-600" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Platform Analytics</h1>
                    <p className="mt-2 text-gray-500">Track marketplace usage and performance.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map(metric => {
                        const Icon = metric.icon;
                        return (
                            <div key={metric.title} className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">{metric.title}</p>
                                        <p className="mt-3 text-3xl font-bold">{metric.value}</p>
                                    </div>
                                    <div className={`${metric.color} rounded-3xl p-4 text-white`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Traffic Sources</h2>
                        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
                            Traffic source chart placeholder
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Top Categories</h2>
                        <div className="space-y-4">
                            {[
                                { category: "Mess", value: "28%" },
                                { category: "Cafe", value: "22%" },
                                { category: "Restaurant", value: "17%" },
                            ].map(item => (
                                <div key={item.category} className="rounded-3xl border p-5">
                                    <div className="flex items-center justify-between">
                                        <span>{item.category}</span>
                                        <span className="font-semibold">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
