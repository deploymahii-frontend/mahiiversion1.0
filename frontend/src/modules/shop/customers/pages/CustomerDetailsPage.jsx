import { useParams, Link } from "react-router-dom";
import useCustomer from "../hooks/useCustomer";
import LoyaltyBadge from "../components/LoyaltyBadge";
import OrderHistory from "../components/OrderHistory";
import { ArrowLeft, Phone, Mail, MapPin, ShieldAlert, ShieldCheck, ShoppingBag, CreditCard } from "lucide-react";

export default function CustomerDetailsPage() {
    const { id } = useParams();
    const { customer, loading, toggleBlockStatus } = useCustomer(id);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
                Loading Customer Details...
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="p-8 max-w-3xl mx-auto text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Not Found</h2>
                <Link to="/shop/customers" className="text-blue-600 font-semibold hover:underline">
                    ← Back to Customers
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Link
                to="/shop/customers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6 transition"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Customers
            </Link>

            {/* Customer Overview Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center border border-blue-200">
                        {(customer.fullName || customer.name || "C").charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {customer.fullName || customer.name || "Customer"}
                            </h1>
                            <LoyaltyBadge totalOrders={customer.totalOrders} isBlocked={customer.isBlocked} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Customer ID: {customer._id}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleBlockStatus}
                        className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition ${
                            customer.isBlocked
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                    >
                        {customer.isBlocked ? (
                            <>
                                <ShieldCheck className="w-4 h-4" /> Unblock Customer
                            </>
                        ) : (
                            <>
                                <ShieldAlert className="w-4 h-4" /> Block Customer
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact & Metrics Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-900 text-base mb-2">Contact Details</h3>
                        {customer.mobile && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Mobile</div>
                                    <div className="font-medium">{customer.mobile}</div>
                                </div>
                            </div>
                        )}
                        {customer.email && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Email</div>
                                    <div className="font-medium truncate">{customer.email}</div>
                                </div>
                            </div>
                        )}
                        {customer.address && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Address</div>
                                    <div className="font-medium">{customer.address}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <ShoppingBag className="w-5 h-5 text-blue-600 mb-2" />
                            <div className="text-xs text-gray-500 font-medium">Total Orders</div>
                            <div className="text-xl font-bold text-gray-900">{customer.totalOrders ?? 0}</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                            <CreditCard className="w-5 h-5 text-emerald-600 mb-2" />
                            <div className="text-xs text-gray-500 font-medium">Total Spent</div>
                            <div className="text-xl font-bold text-emerald-600">₹{customer.totalSpent ?? 0}</div>
                        </div>
                    </div>
                </div>

                {/* Main Order History Section */}
                <div className="lg:col-span-2">
                    <OrderHistory orders={customer.orders || customer.orderHistory || []} />
                </div>
            </div>
        </div>
    );
}
