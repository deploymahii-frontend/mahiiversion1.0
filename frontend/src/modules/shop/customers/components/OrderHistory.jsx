import { Link } from "react-router-dom";
import { Package, Calendar, ArrowRight } from "lucide-react";

export default function OrderHistory({ orders = [] }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-500">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="font-medium text-sm">No order history recorded for this customer.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Recent Order History ({orders.length})
            </h3>

            <div className="divide-y divide-gray-100">
                {orders.map((order) => (
                    <div key={order._id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                        <div>
                            <div className="font-semibold text-gray-900 text-sm">
                                Order #{order.orderNumber || order._id?.substring(0, 8)}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"}</span>
                                <span>•</span>
                                <span>{order.items?.length || 1} items</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="font-bold text-gray-900 text-sm">₹{order.totalAmount || order.totalPrice || 0}</div>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                                    order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                                    order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                    "bg-blue-100 text-blue-700"
                                }`}>
                                    {order.status || "COMPLETED"}
                                </span>
                            </div>

                            <Link
                                to={`/shop/orders/${order._id}`}
                                className="p-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition"
                                title="View Order Details"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
