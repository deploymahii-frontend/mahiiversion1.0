// src/modules/shopOwner/pages/AnalyticsDashboard.jsx

import {
    FaChartLine,
    FaShoppingBag,
    FaUsers,
    FaMoneyBillWave,
    FaDownload,
} from "react-icons/fa";

export default function AnalyticsDashboard() {
    const kpis = [
        {
            title: "Revenue",
            value: "₹4,82,500",
            icon: FaMoneyBillWave,
            color: "bg-green-500",
        },
        {
            title: "Orders",
            value: "3,452",
            icon: FaShoppingBag,
            color: "bg-blue-500",
        },
        {
            title: "Customers",
            value: "1,287",
            icon: FaUsers,
            color: "bg-purple-500",
        },
        {
            title: "Growth",
            value: "+18%",
            icon: FaChartLine,
            color: "bg-orange-500",
        },
    ];

    const topProducts = [
        {
            name: "Special Veg Thali",
            sold: 842,
        },
        {
            name: "Mini Thali",
            sold: 615,
        },
        {
            name: "Paneer Meal",
            sold: 482,
        },
        {
            name: "Rice Plate",
            sold: 396,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Business Analytics</h1>
                        <p className="mt-2 text-gray-500">Monitor your shop performance.</p>
                    </div>
                    <div className="flex gap-3">
                        <select className="rounded-xl border bg-white px-4 py-3">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                            <FaDownload />
                            Export
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map(item => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500">{item.title}</p>
                                        <h2 className="mt-3 text-3xl font-bold">{item.value}</h2>
                                    </div>
                                    <div className={`${item.color} rounded-2xl p-4 text-white`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Revenue Trend</h2>
                        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
                            Revenue Chart Placeholder
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Order Trend</h2>
                        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
                            Orders Chart Placeholder
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Top Selling Products</h2>
                        <div className="space-y-4">
                            {topProducts.map(product => (
                                <div key={product.name} className="flex items-center justify-between rounded-xl border p-4">
                                    <span>{product.name}</span>
                                    <span className="font-bold">{product.sold} Sold</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Peak Hours</h2>
                        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed">
                            Peak Hours Chart Placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
