import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Package, Boxes,
  Tag, BarChart3, Star, Crown, Store, Settings,
  LogOut, Bell, Sun, Moon, Home, Menu, X, ChevronDown, Camera,
} from "lucide-react";
import { useShopDashboard } from "../hooks/useShopOwner";
import useAuthStore from "../../auth/store/auth.store";
import toast from "react-hot-toast";

const NAV = [
  { label: "Dashboard",    to: "",          icon: LayoutDashboard },
  { label: "Orders",       to: "orders",    icon: ShoppingBag },
  { label: "Products",     to: "products",  icon: Package },
  { label: "Inventory",    to: "inventory", icon: Boxes },
  { label: "Offers",       to: "offers",    icon: Tag },
  { label: "Mahii Moment", to: "moments",   icon: Camera },
  { label: "Analytics",    to: "analytics", icon: BarChart3 },
  { label: "Reviews",      to: "reviews",   icon: Star },
  { label: "Subscription", to: "subscription", icon: Crown },
  { label: "Shop Profile", to: "profile",   icon: Store },
  { label: "Settings",     to: "settings",  icon: Settings },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { data } = useShopDashboard();

  const shopName = data?.shop?.name || user?.name || user?.fullName || "My Shop";
  const shopInitial = shopName?.[0]?.toUpperCase() || "S";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-xl transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:shadow-none`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              M
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-sm">Mahii</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Owner Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
            <X size={18} />
          </button>
        </div>

        {/* Shop info */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-950/40 rounded-2xl p-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {shopInitial}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{shopName}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                {data?.shop?.status === "APPROVED" ? "✓ Verified" : "Partner Shop"}
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ""}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <Home size={17} />
            Go to Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuToggle, darkMode, setDarkMode }) {
  const { data } = useShopDashboard();
  const user = useAuthStore((s) => s.user);
  const [showNotif, setShowNotif] = useState(false);

  const shopName = data?.shop?.name || user?.name || user?.fullName || "My Shop";
  const shopInitial = shopName?.[0]?.toUpperCase() || "S";
  const pendingOrders = data?.stats?.pendingOrders ?? 0;
  const todayRevenue = data?.stats?.todayRevenue ?? data?.stats?.revenue ?? 0;

  const notifications = [
    ...(pendingOrders > 0 ? [{ id: "n1", text: `${pendingOrders} new order${pendingOrders > 1 ? "s" : ""} waiting`, dot: "bg-orange-500", time: "Just now" }] : []),
    { id: "n2", text: `Today's revenue: ₹${Number(todayRevenue).toLocaleString("en-IN")}`, dot: "bg-green-500", time: "Today" },
  ];

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 gap-4 transition-colors">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{shopName}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {data?.shop?.status === "APPROVED" ? "✓ Verified Shop" : "Mahii Partner"}
          </p>
        </div>
      </div>

      {/* Right: pending pill, dark mode, notif, avatar */}
      <div className="flex items-center gap-2">
        {/* Pending badge */}
        {pendingOrders > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {pendingOrders} pending
          </div>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4">
              <p className="font-bold text-sm text-slate-900 dark:text-white mb-3">Notifications</p>
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{n.text}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowNotif(false)}
                className="mt-3 w-full text-xs text-orange-500 font-semibold hover:underline"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
            {shopInitial}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[100px]">{shopName}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Shop Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ShopOwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
