import useDashboard from "../hooks/useDashboard";
import DashboardSkeleton from "../components/DashboardSkeleton";
import useAuthStore from "@/modules/auth/store/auth.store";
import { Link } from "react-router-dom";
import { Home, RefreshCw } from "lucide-react";

import HeroBanner from "../sections/HeroBanner";
import ActiveOrder from "../sections/ActiveOrder";
import DashboardSummary from "../sections/DashboardSummary";
import QuickActions from "../sections/QuickActions";
import WalletSection from "../sections/WalletSection";
import RecentOrders from "../sections/RecentOrders";
import NotificationPreview from "../sections/NotificationPreview";
import GoldMembership from "../sections/GoldMembership";

export default function DashboardHome() {
  const { data, isLoading, error, refetch } = useDashboard();
  const user = useAuthStore((s) => s.user);

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center text-2xl shadow-sm">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Failed to load dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
          Please check your internet connection or backend server status and try again.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <button
            onClick={() => refetch()}
            className="rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold flex items-center gap-2 hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            <RefreshCw size={18} />
            Retry Connection
          </button>
          <Link
            to="/"
            className="rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-6 py-3 font-semibold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Home size={18} />
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  /* ── Map API response (DashboardDTO) to section props ── */
  const profile      = data?.profile || {};
  const wallet       = data?.wallet || {};
  const membership   = data?.membership || {};
  const recentOrders = data?.recentOrders || [];
  const notifications = data?.notifications || [];
  const stats        = data?.stats || {};

  // Build active order (the first non-delivered order)
  const activeOrder = recentOrders.find(
    (o) => o.status && !["DELIVERED", "CANCELLED", "COMPLETED"].includes(o.status.toUpperCase())
  );

  // Summary cards data mapping
  const summaryData = {
    balance: wallet.balance || 0,
    totalOrders: stats.totalOrdersCount || recentOrders.length,
    rewardPoints: stats.rewardPoints || 0,
    wishlistCount: stats.wishlistCount || 0,
  };

  return (
    <div className="space-y-8">

      {/* 1. Hero Welcome Banner */}
      <HeroBanner user={profile} />

      {/* 2. Active Order Tracker — only if in-progress */}
      {activeOrder && (
        <ActiveOrder
          order={{
            _id: activeOrder.id,
            shopName: activeOrder.shopName,
            status: activeOrder.status,
            eta: "25 mins",
          }}
        />
      )}

      {/* 3. Summary Stats — Wallet, Orders, Rewards, Wishlist */}
      <DashboardSummary data={summaryData} />

      {/* 4. Quick Actions Grid */}
      <QuickActions />

      {/* 5. Wallet Section */}
      <WalletSection wallet={wallet} />

      {/* 6. Gold Membership */}
      <GoldMembership membership={membership} />

      {/* 7. Recent Orders */}
      <RecentOrders orders={recentOrders} />

      {/* 8. Notifications */}
      <NotificationPreview notifications={notifications} />

    </div>
  );
}
