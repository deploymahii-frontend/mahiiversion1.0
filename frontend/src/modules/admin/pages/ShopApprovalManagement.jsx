// src/modules/admin/pages/ShopApprovalManagement.jsx

import { useMemo, useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDashboardApi } from "../services/adminDashboard.api";
import toast from "react-hot-toast";

export default function ShopApprovalManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "shops", { search, status: statusFilter }],
    queryFn: () => adminDashboardApi.getShops({ search, status: statusFilter }).then((r) => r.data),
  });

  const shops = useMemo(() => data?.data?.shops || data?.data || [], [data]);

  const approveMutation = useMutation({
    mutationFn: (id) => adminDashboardApi.approveShop(id),
    onSuccess: () => {
      toast.success("Shop approved!");
      queryClient.invalidateQueries(["admin", "shops"]);
      queryClient.invalidateQueries(["admin", "dashboard"]);
    },
    onError: () => toast.error("Failed to approve shop"),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => adminDashboardApi.rejectShop(id),
    onSuccess: () => {
      toast.success("Shop rejected!");
      queryClient.invalidateQueries(["admin", "shops"]);
      queryClient.invalidateQueries(["admin", "dashboard"]);
    },
    onError: () => toast.error("Failed to reject shop"),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Businesses & Approvals</h1>
            <p className="mt-2 text-gray-500">Manage all registered businesses on Mahii from live data.</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center max-w-2xl">
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Search by business name or owner..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-3xl border bg-white py-3 px-6 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="REJECTED">Rejected</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm border border-gray-100">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">Shop Name</th>
                <th className="p-4 text-left">Owner</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">Loading businesses…</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-red-500">{error?.message || "Unable to load businesses"}</td>
                </tr>
              ) : shops.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No businesses found.</td>
                </tr>
              ) : (
                shops.map((shop) => (
                  <tr key={shop.id || shop._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{shop.name || shop.businessName || "—"}</td>
                    <td className="p-4 text-gray-600">
                      {shop.owner?.name || [shop.owner?.firstName, shop.owner?.lastName].filter(Boolean).join(" ") || "—"}
                      <div className="text-xs text-gray-400">{shop.owner?.email || ""}</div>
                    </td>
                    <td className="p-4">{shop.category || shop.category?.name || "N/A"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        shop.status === "APPROVED" || shop.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                        shop.status === "PENDING" ? "bg-orange-100 text-orange-700" :
                        shop.status === "REJECTED" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {shop.status || "UNKNOWN"}
                      </span>
                    </td>
                    <td className="p-4">
                      {shop.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveMutation.mutate(shop.id || shop._id)}
                            disabled={approveMutation.isPending}
                            className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 transition"
                            title="Approve Shop"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => rejectMutation.mutate(shop.id || shop._id)}
                            disabled={rejectMutation.isPending}
                            className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 transition"
                            title="Reject Shop"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                      {shop.status !== "PENDING" && (
                        <span className="text-xs text-gray-400 italic">No actions</span>
                      )}
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
