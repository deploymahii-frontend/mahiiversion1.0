import React from "react";

import ApprovalActions from "./ApprovalActions";

export default function PendingShopsTable({ shops = [] }) {

    if (!shops || shops.length === 0) return (
        <div className="p-6 text-center text-gray-500">No pending shops found.</div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b">Shop</th>
                        <th className="px-6 py-3 border-b">Owner</th>
                        <th className="px-6 py-3 border-b">Submitted</th>
                        <th className="px-6 py-3 border-b">Status</th>
                        <th className="px-6 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.map((s) => (
                        <tr key={s._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">
                                <div className="font-medium">{s.name}</div>
                                <div className="text-sm text-gray-500">{s.address}</div>
                            </td>
                            <td className="px-6 py-4 border-b">
                                <div>{s.owner?.name}</div>
                                <div className="text-sm text-gray-500">{s.owner?.email}</div>
                            </td>
                            <td className="px-6 py-4 border-b">{new Date(s.createdAt).toLocaleString()}</td>
                            <td className="px-6 py-4 border-b">{s.status}</td>
                            <td className="px-6 py-4 border-b">
                                <ApprovalActions shop={s} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
