import DashboardCards from "@/modules/admin/components/DashboardCards";
import Charts from "@/modules/admin/components/Charts";
import RecentActivity from "@/modules/admin/components/RecentActivity";
import PendingApprovals from "@/modules/admin/components/PendingApprovals";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export default function AdminDashboard() {
  const { dashboard, loading, error, refetch } = useAdminDashboard();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-[#1f2937]">Overview</h2>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 text-gray-400">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a73e8] mb-2"></div>
          <span className="text-sm">Loading real-time dashboard data…</span>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-600 rounded-lg border border-red-100 flex flex-col items-center justify-center text-center">
          <FiAlertCircle size={32} className="mb-3 text-red-500" />
          <p className="font-semibold text-lg">Failed to load dashboard data</p>
          <p className="text-sm mt-1 mb-4 text-red-500/80">{error?.message || "Could not connect to server"}</p>
          <button 
            onClick={() => refetch?.()}
            className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded shadow-sm border border-red-200 hover:bg-red-50 transition"
          >
            <FiRefreshCw size={14} /> Try Again
          </button>
        </div>
      ) : (
        <>
          <DashboardCards data={dashboard} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Wrapping Charts with generic styling since it's an old component */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <Charts data={dashboard} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <PendingApprovals data={dashboard} />
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <RecentActivity data={dashboard} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
