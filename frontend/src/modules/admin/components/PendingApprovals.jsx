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
        <h3 className="font-bold text-[#1f2937] text-sm">Action Required: Shop Approvals</h3>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
          {pendingShops.length} Pending
        </span>
      </div>

      {pendingShops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-center">
          <FiShoppingBag size={32} className="mb-2 opacity-50" />
          <p className="text-sm">No shops pending approval.</p>
          <p className="text-xs mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingShops.map((shop) => (
            <div key={shop.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#f1f3f4] flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-[#1a73e8]" size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1f2937] line-clamp-1">{shop.name}</p>
                  <p className="text-xs text-gray-500">{shop.category} · {shop.city}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => rejectShop(shop.id)}
                  disabled={rejecting || approving}
                  className="w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
                  title="Reject"
                >
                  <FiX size={16} />
                </button>
                <button 
                  onClick={() => approveShop(shop.id)}
                  disabled={rejecting || approving}
                  className="w-8 h-8 rounded bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors disabled:opacity-50"
                  title="Approve"
                >
                  <FiCheck size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
