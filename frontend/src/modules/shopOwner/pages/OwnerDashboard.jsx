// src/modules/shopOwner/pages/OwnerDashboard.jsx

import { Link } from "react-router-dom";
import {
    FaStore,
    FaShoppingBag,
    FaUsers,
    FaMoneyBillWave,
    FaChartLine,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";

export default function OwnerDashboard() {
    const stats = [
        {
            title: "Today's Orders",
            value: 124,
            icon: FaShoppingBag,
            color: "bg-blue-500",
            link: "/owner/orders",
        },
        {
            title: "Today's Revenue",
            value: "₹18,420",
            icon: FaMoneyBillWave,
            color: "bg-green-500",
            link: "/owner/earnings",
        },
        {
            title: "Customers",
            value: 845,
            icon: FaUsers,
            color: "bg-purple-500",
            link: "/owner/customers",
        },
        {
            title: "Average Rating",
            value: "4.8",
            icon: FaStar,
            color: "bg-yellow-500",
            link: "/owner/reviews",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-3 text-blue-600">
                            <FaStore className="h-10 w-10" />
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900">Shop Owner Dashboard</h1>
                                <p className="mt-2 text-gray-500">
                                    Welcome back! Here's your business overview.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/owner/settings"
                        className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
                    >
                        Manage Shop Settings
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <Link
                                key={stat.title}
                                to={stat.link}
                                className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl text-white ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-4 text-3xl font-semibold text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center justify-between text-sm font-semibold text-blue-600">
                                    <span>View details</span>
                                    <FaArrowRight />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
