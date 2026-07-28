// src/modules/admin/pages/PaymentSettlementManagement.jsx

import { useState } from "react";
import { FaMoneyCheckAlt, FaSearch, FaCheck, FaTimes } from "react-icons/fa";

export default function PaymentSettlementManagement() {
    const [search, setSearch] = useState("");
    const [settlements, setSettlements] = useState([]);

    const filteredSettlements = settlements.filter(entry =>
        entry.shopName?.toLowerCase().includes(search.toLowerCase()) ||
        entry.transactionId?.toLowerCase().includes(search.toLowerCase())
    );

    function updateSettlement(id, status) {
        setSettlements(previous =>
            previous.map(entry =>
                entry._id === id ? { ...entry, status } : entry
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Payment Settlement Management</h1>
                        <p className="mt-2 text-gray-500">Review and approve payout settlements.</p>
                    </div>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search settlements..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
                    <table className="min-w-full">
                        <thead className="border-b bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Shop</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Transaction ID</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSettlements.map(entry => (
                                <tr key={entry._id} className="border-b">
                                    <td className="p-4">{entry.shopName}</td>
                                    <td className="p-4">₹{entry.amount}</td>
                                    <td className="p-4">{entry.transactionId}</td>
                                    <td className="p-4">{entry.status}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateSettlement(entry._id, "settled")}
                                                className="rounded-lg bg-green-600 p-2 text-white"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => updateSettlement(entry._id, "flagged")}
                                                className="rounded-lg bg-red-600 p-2 text-white"
                                            >
                                                <FaTimes />
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
