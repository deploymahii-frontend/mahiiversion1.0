import { Link } from "react-router-dom";
import LoyaltyBadge from "./LoyaltyBadge";
import { ArrowUpRight } from "lucide-react";

export default function CustomerTable({ customers = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Customer Name</th>
                            <th className="p-4">Mobile</th>
                            <th className="p-4">Total Orders</th>
                            <th className="p-4">Total Spent</th>
                            <th className="p-4">Status / Loyalty</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {customers.map((c) => (
                            <tr key={c._id} className="hover:bg-slate-50/50 transition">
                                <td className="p-4 font-semibold text-gray-900">
                                    {c.fullName || c.name || "Customer"}
                                    {c.email && (
                                        <div className="text-xs font-normal text-gray-400">{c.email}</div>
                                    )}
                                </td>
                                <td className="p-4 text-gray-600 font-mono text-xs">{c.mobile || "N/A"}</td>
                                <td className="p-4 font-bold text-gray-800">{c.totalOrders ?? 0}</td>
                                <td className="p-4 font-semibold text-emerald-600">₹{c.totalSpent ?? 0}</td>
                                <td className="p-4">
                                    <LoyaltyBadge totalOrders={c.totalOrders} isBlocked={c.isBlocked} />
                                </td>
                                <td className="p-4 text-right">
                                    <Link
                                        to={`/shop/customers/${c._id}`}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition"
                                    >
                                        Details <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
