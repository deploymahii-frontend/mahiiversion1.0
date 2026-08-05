import DashboardCards from "@/modules/admin/components/DashboardCards";
import Charts from "@/modules/admin/components/Charts";
import RecentActivity from "@/modules/admin/components/RecentActivity";
import PendingApprovals from "@/modules/admin/components/PendingApprovals";
import SystemStatus from "@/modules/admin/components/SystemStatus";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";

export default function AdminDashboard() {
  const { dashboard, loading, error, refetch } = useAdminDashboard();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#ededed] tracking-tight">Dashboard</h1>
          <p className="text-xs text-[#666] mt-1 font-mono">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <button
          onClick={() => refetch?.()}
          className="flex items-center gap-2 text-xs text-[#888] hover:text-[#ededed] border border-[#333] rounded-md px-3 py-1.5 hover:border-[#555] transition-all bg-[#0A0A0A]"
        >
          <FiRefreshCw size={12} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-80 text-[#888]">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border border-[#333]" />
            <div className="absolute inset-0 w-10 h-10 rounded-full border-t border-[#ededed] animate-spin" />
          </div>
          <span className="text-xs mt-4 font-mono">Loading dashboard data...</span>
        </div>
      ) : error ? (
        <div className="p-8 border border-[#333] bg-[#0A0A0A] rounded-lg flex flex-col items-center justify-center text-center">
          <FiAlertCircle size={28} className="mb-3 text-red-400" />
          <p className="font-medium text-sm text-[#ededed]">Failed to load dashboard</p>
          <p className="text-xs mt-1 mb-5 text-[#666] font-mono">{error?.message || "Could not connect to server"}</p>
          <button
            onClick={() => refetch?.()}
            className="flex items-center gap-2 text-xs border border-[#333] text-[#888] hover:text-[#ededed] px-4 py-2 rounded-md hover:border-[#555] transition-all"
          >
            <FiRefreshCw size={12} /> Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Metric Cards */}
          <DashboardCards data={dashboard} />

          {/* Full-Width Charts Section */}
          <div className="rounded-lg border border-[#222] bg-[#0A0A0A] p-6">
            <Charts data={dashboard} />
          </div>

          {/* Bottom Grid: Approvals + Activity + Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-[#222] bg-[#0A0A0A] p-5">
              <PendingApprovals data={dashboard} />
            </div>
            <div className="rounded-lg border border-[#222] bg-[#0A0A0A] p-5">
              <RecentActivity data={dashboard} />
            </div>
            <div className="rounded-lg border border-[#222] bg-[#0A0A0A] p-5">
              <SystemStatus />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
