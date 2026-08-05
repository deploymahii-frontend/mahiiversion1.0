import { FiCheck, FiX, FiShoppingBag, FiClock } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDashboardApi } from "../services/adminDashboard.api";
import toast from "react-hot-toast";

export default function PendingApprovals({ data }) {
  const queryClient = useQueryClient();
  const pendingShops = data?.pendingShops || [];

  const { mutate: approveShop, isLoading: approving } = useMutation({
    mutationFn: (id) => adminDashboardApi.approveShop(id),
    onSuccess: () => {
      toast.success("Shop approved!");
      queryClient.invalidateQueries(["admin", "dashboard"]);
    },
    onError: () => toast.error("Failed to approve shop"),
  });

  const { mutate: rejectShop, isLoading: rejecting } = useMutation({
    mutationFn: (id) => adminDashboardApi.rejectShop(id),
    onSuccess: () => {
      toast.success("Shop rejected!");
      queryClient.invalidateQueries(["admin", "dashboard"]);
    },
    onError: () => toast.error("Failed to reject shop"),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#ededed]">Pending Approvals</h3>
        <span className="text-[10px] font-mono text-[#888] bg-[#111] border border-[#333] px-2 py-0.5 rounded">
          {pendingShops.length}
        </span>
      </div>

      {pendingShops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FiShoppingBag size={24} className="mb-2 text-[#444]" />
          <p className="text-xs text-[#666]">No pending approvals</p>
        </div>
      ) : (
        <div className="space-y-2">
          {pendingShops.map((shop) => (
            <div
              key={shop.id}
              className="flex items-center justify-between p-3 border border-[#222] bg-[#0A0A0A] rounded-md hover:border-[#333] transition-colors group"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#ededed] truncate">{shop.name}</p>
                <p className="text-[11px] text-[#666] font-mono mt-0.5">
                  {shop.category} · {shop.city}
                </p>
              </div>
              <div className="flex gap-1.5 shrink-0 ml-3">
                <button
                  onClick={() => rejectShop(shop.id)}
                  disabled={rejecting || approving}
                  className="w-7 h-7 rounded border border-[#333] text-[#888] hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-all disabled:opacity-40"
                  title="Reject"
                >
                  <FiX size={14} />
                </button>
                <button
                  onClick={() => approveShop(shop.id)}
                  disabled={rejecting || approving}
                  className="w-7 h-7 rounded border border-[#333] text-[#888] hover:text-emerald-400 hover:border-emerald-400/30 flex items-center justify-center transition-all disabled:opacity-40"
                  title="Approve"
                >
                  <FiCheck size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
