import { useShopDashboard } from "../hooks/useShopOwner";
import {
  ShoppingBag, Package, TrendingUp, Star, Clock, IndianRupee,
  RefreshCw, AlertCircle, Store
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";

function StatCard({ label, value, sub, icon: Icon, color = "bg-slate-50 text-slate-700" }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">{label}</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{value ?? "—"}</h2>
          {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default function ShopOwnerDashboard() {
  const { data, isLoading, error, refetch } = useShopDashboard();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-950/40 rounded-full flex items-center justify-center">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h3 className="font-bold text-slate-800 dark:text-white text-lg">Could not load dashboard</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
          {error?.message || "Unable to connect to the server. Please try again."}
        </p>
        <button
          onClick={() => refetch?.()}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (data && !data.shopExists) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="text-6xl">🏪</div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">No Shop Found</h2>
        <p className="text-slate-400 dark:text-slate-500">Register your shop to start selling on Mahii</p>
        <Link to="/shop/register" className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition">
          Register Shop
        </Link>
      </div>
    );
  }

  const { stats = {}, shop = {} } = data || {};

  if (shop.status === "PENDING") {
    return <Navigate to="/dashboard/approval-pending" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-orange-100 text-sm font-medium">{greeting()}, 👋</p>
            <h1 className="text-2xl md:text-3xl font-black mt-1">{shop.name || "My Shop"}</h1>
            <p className="text-orange-100 text-sm mt-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {stats.todayRevenue != null && (
                <> · Today's revenue: <strong>₹{Number(stats.todayRevenue).toLocaleString("en-IN")}</strong></>
              )}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => refetch?.()}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2.5 rounded-2xl text-sm font-semibold transition"
            >
              <RefreshCw size={15} /> Refresh
            </button>
            <Link
              to="orders"
              className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-orange-50 transition shadow"
            >
              <ShoppingBag size={15} /> View Orders
            </Link>
          </div>
        </div>
      </div>

      {/* Pending Orders Alert */}
      {stats.pendingOrders > 0 && (
        <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-orange-700 dark:text-orange-300">
              🔔 {stats.pendingOrders} order{stats.pendingOrders > 1 ? "s" : ""} need{stats.pendingOrders === 1 ? "s" : ""} your attention
            </p>
            <p className="text-sm text-orange-500 dark:text-orange-400 mt-0.5">Accept or reject pending orders now</p>
          </div>
          <Link
            to="orders"
            className="flex-shrink-0 bg-orange-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition"
          >
            View Orders
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Today's Orders"
          value={stats.todayOrders}
          icon={ShoppingBag}
          color="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
          sub={`${stats.pendingOrders ?? 0} pending`}
        />
        <StatCard
          label="Today's Revenue"
          value={`₹${Number(stats.todayRevenue ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          label="Total Revenue"
          value={`₹${Number(stats.totalRevenue ?? 0).toLocaleString("en-IN")}`}
          icon={TrendingUp}
          color="bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400"
          sub={`${stats.completedOrders ?? 0} completed`}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          icon={Clock}
          color="bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
          sub={`${stats.pendingOrders ?? 0} active`}
        />
        <StatCard
          label="Products"
          value={stats.totalProducts}
          icon={Package}
          color="bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400"
          sub={stats.lowStockProducts ? `${stats.lowStockProducts} low stock` : "In catalogue"}
        />
        <StatCard
          label="Rating"
          value={stats.rating ? Number(stats.rating).toFixed(1) : "—"}
          icon={Star}
          color="bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
          sub={`${stats.totalReviews ?? 0} reviews`}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "View Orders",  to: "orders",    color: "from-blue-500 to-indigo-500" },
            { label: "Add Product",  to: "products",  color: "from-emerald-500 to-teal-500" },
            { label: "Inventory",    to: "inventory", color: "from-amber-500 to-orange-500" },
            { label: "Analytics",    to: "analytics", color: "from-purple-500 to-pink-500" },
          ].map(({ label, to, color }) => (
            <Link
              key={to}
              to={to}
              className={`bg-gradient-to-r ${color} text-white rounded-2xl p-4 font-bold text-sm text-center hover:opacity-90 transition-opacity shadow-md`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
