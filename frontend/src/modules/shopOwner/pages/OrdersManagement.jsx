// src/modules/shopOwner/pages/OrdersManagement.jsx

import { useState } from "react";
import {
    FaSearch,
    FaCheck,
    FaTimes,
    FaTruck,
    FaEye,
} from "react-icons/fa";

export default function OrdersManagement() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [orders, setOrders] = useState([]);

    function updateStatus(id, status) {
        setOrders(previous =>
            previous.map(order =>
                order._id === id
                    ? {
                          ...order,
                          status,
                      }
                    : order
            )
        );
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            order.orderNumber?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all"
                ? true
                : order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Orders Management</h1>
                    <p className="mt-2 text-gray-500">Manage all customer orders.</p>
                </div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Search order..."
                            className="w-full rounded-xl border bg-white py-3 pl-11 pr-4"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={event => setStatusFilter(event.target.value)}
                        className="rounded-xl border bg-white px-4 py-3"
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Order</th>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Payment</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order._id} className="border-b">
                                    <td className="p-4">{order.orderNumber}</td>
                                    <td className="p-4">{order.customerName}</td>
                                    <td className="p-4">₹{order.amount}</td>
                                    <td className="p-4">{order.paymentStatus}</td>
                                    <td className="p-4">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">{order.status}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                className="rounded-lg bg-green-600 p-2 text-white"
                                                onClick={() => updateStatus(order._id, "accepted")}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="rounded-lg bg-red-600 p-2 text-white"
                                                onClick={() => updateStatus(order._id, "cancelled")}
                                            >
                                                <FaTimes />
                                            </button>
                                            <button
                                                className="rounded-lg bg-orange-500 p-2 text-white"
                                                onClick={() => updateStatus(order._id, "completed")}
                                            >
                                                <FaTruck />
                                            </button>
                                            <button className="rounded-lg bg-blue-600 p-2 text-white">
                                                <FaEye />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
