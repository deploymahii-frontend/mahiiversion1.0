// src/modules/admin/pages/DisputeResolution.jsx

import { useState } from "react";
import { FaSearch, FaCheck, FaTimes, FaCommentDots } from "react-icons/fa";

export default function DisputeResolution() {
    const [search, setSearch] = useState("");
    const [disputes, setDisputes] = useState([]);

    const filteredDisputes = disputes.filter(dispute =>
        dispute.shopName?.toLowerCase().includes(search.toLowerCase()) ||
        dispute.customerName?.toLowerCase().includes(search.toLowerCase())
    );

    function resolveDispute(id, decision) {
        setDisputes(previous =>
            previous.map(dispute =>
                dispute._id === id ? { ...dispute, decision } : dispute
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Dispute Resolution</h1>
                        <p className="mt-2 text-gray-500">Manage customer disputes and merchant claims.</p>
                    </div>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search disputes..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="grid gap-6">
                    {filteredDisputes.map(dispute => (
                        <div key={dispute._id} className="rounded-3xl bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">{dispute.subject}</h2>
                                    <p className="mt-2 text-gray-500">Shop: {dispute.shopName}</p>
                                    <p className="text-gray-500">Customer: {dispute.customerName}</p>
                                </div>
                                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">{dispute.status}</span>
                            </div>
                            <div className="mt-5 rounded-3xl border bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <FaCommentDots className="mt-1 text-gray-400" />
                                    <p className="text-gray-600">{dispute.details}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <button
                                    onClick={() => resolveDispute(dispute._id, "approved")}
                                    className="rounded-2xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                                >
                                    <FaCheck /> Approve
                                </button>
                                <button
                                    onClick={() => resolveDispute(dispute._id, "rejected")}
                                    className="rounded-2xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                >
                                    <FaTimes /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
