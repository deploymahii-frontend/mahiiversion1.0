import { Link } from "react-router-dom";
import { Phone, Mail, ShoppingBag, ArrowRight } from "lucide-react";
import LoyaltyBadge from "./LoyaltyBadge";

export default function CustomerCard({ customer }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="font-bold text-gray-900 text-lg line-clamp-1">
                        {customer.fullName || customer.name || "Customer"}
                    </h2>
                    <LoyaltyBadge 
                        totalOrders={customer.totalOrders} 
                        isBlocked={customer.isBlocked} 
                    />
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    {customer.mobile && (
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{customer.mobile}</span>
                        </div>
                    )}
                    {customer.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{customer.email}</span>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                        <span>Orders: <strong className="text-gray-900">{customer.totalOrders ?? 0}</strong></span>
                    </div>
                    <div>
                        Spent: <strong className="text-emerald-600">₹{customer.totalSpent ?? 0}</strong>
                    </div>
                </div>
            </div>

            <Link
                to={`/shop/customers/${customer._id}`}
                className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition"
            >
                View Profile <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
