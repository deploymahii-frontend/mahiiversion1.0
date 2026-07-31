import {
  Home,
  ShoppingBag,
  Heart,
  Wallet,
  Bell,
  User,
  Settings,
  MapPin,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "@/modules/auth/store/auth.store";

const menu = [
  { title: "Dashboard", icon: Home, path: "/customer/dashboard" },
  { title: "Orders", icon: ShoppingBag, path: "/customer/orders" },
  { title: "Wishlist", icon: Heart, path: "/customer/wishlist" },
  { title: "Wallet", icon: Wallet, path: "/customer/wallet" },
  { title: "Addresses", icon: MapPin, path: "/customer/addresses" },
  { title: "Notifications", icon: Bell, path: "/customer/notifications" },
  { title: "Profile", icon: User, path: "/customer/profile" },
  { title: "Settings", icon: Settings, path: "/customer/settings" },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 transition-colors">
      <div className="flex flex-col w-full">
        {/* Brand Logo Header */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
          <NavLink to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Mahii<span className="text-blue-600 dark:text-blue-400">.</span>
          </NavLink>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
