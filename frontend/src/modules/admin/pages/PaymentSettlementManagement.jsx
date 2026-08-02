// src/modules/admin/pages/PaymentSettlementManagement.jsx

import { useEffect, useState } from "react";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import api from "@/services/api";

export default function PaymentSettlementManagement() {
  const [search, setSearch] = useState("");
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/payments");
        setSettlements(response?.data?.data?.payments || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load payments");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  const filteredSettlements = settlements.filter((entry) => {
    const term = search.toLowerCase();
    return [
      entry.orderId || "",
      entry.providerTransactionId || "",
      entry.provider || "",
      entry.method || "",
      entry.status || "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  const updateSettlement = async (id, status) => {
    try {
      const response = await api.patch(`/admin/payments/${id}/status`, { status });
      const updatedPayment = response?.data?.data;

      setSettlements((previous) =>
        previous.map((entry) =>
          entry.id === updatedPayment.id || entry._id === updatedPayment.id
            ? { ...entry, ...updatedPayment }
            : entry
        )
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update payment status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Payment Settlement Management</h1>
            <p className="mt-2 text-gray-500">Review payment records and update payment status in real time.</p>
          </div>
        </div>

        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
            placeholder="Search payments..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Transaction</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Loading payments…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredSettlements.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredSettlements.map((entry) => (
                  <tr key={entry.id || entry._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">{entry.orderId || "—"}</td>
                    <td className="p-4">₹{entry.amount?.toFixed?.(2) ?? entry.amount ?? "—"}</td>
                    <td className="p-4">{entry.providerTransactionId || "—"}</td>
                    <td className="p-4">{entry.method || entry.provider || "—"}</td>
                    <td className="p-4">{entry.status || "—"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={entry.status === "SUCCESS"}
                          onClick={() => updateSettlement(entry.id || entry._id, "SUCCESS")}
                          className="rounded-lg bg-green-600 p-2 text-white disabled:opacity-50"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          disabled={entry.status === "FAILED"}
                          onClick={() => updateSettlement(entry.id || entry._id, "FAILED")}
                          className="rounded-lg bg-red-600 p-2 text-white disabled:opacity-50"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
