// src/modules/shopOwner/pages/EarningsDashboard.jsx

import { FaWallet, FaChartBar, FaCalendarAlt, FaArrowUp } from "react-icons/fa";

export default function EarningsDashboard() {
    const earnings = [
        { title: "Total Earnings", value: "₹3,97,200", icon: FaWallet, color: "bg-blue-600" },
        { title: "Weekly Revenue", value: "₹72,800", icon: FaChartBar, color: "bg-green-600" },
        { title: "Transactions", value: "1,124", icon: FaCalendarAlt, color: "bg-indigo-600" },
        { title: "Growth", value: "+16%", icon: FaArrowUp, color: "bg-orange-600" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Earnings Dashboard</h1>
                        <p className="mt-2 text-gray-500">Review your earnings summaries.</p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {earnings.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.title}</p>
                                        <p className="mt-3 text-3xl font-bold">{item.value}</p>
                                    </div>
                                    <div className={`${item.color} rounded-3xl p-4 text-white`}>
                                        <Icon className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Monthly Earnings</h2>
                        <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
                            Monthly earnings chart placeholder
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-2xl font-bold">Recent Payouts</h2>
                        <div className="space-y-4">
                            {[
                                { title: "Payout to bank account", amount: "₹18,400", date: "2 Jul 2026" },
                                { title: "Payout to bank account", amount: "₹22,500", date: "25 Jun 2026" },
                                { title: "Payout to bank account", amount: "₹16,700", date: "18 Jun 2026" },
                            ].map((payout, index) => (
                                <div key={index} className="rounded-3xl border p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">{payout.title}</h3>
                                            <p className="text-sm text-gray-500">{payout.date}</p>
                                        </div>
                                        <p className="text-lg font-bold">{payout.amount}</p>
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
