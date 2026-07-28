import { Link } from "react-router-dom";
import { Bell, ShoppingCart, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, authenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/mahiiindextitle.png" alt="Mahii Logo" className="h-8 w-auto" />
          <span className="text-2xl font-extrabold text-orange-500">Mahii</span>
        </Link>

        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <ThemeToggle />

          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition">
            <Bell className="h-5 w-5" />
          </button>

          <Link to="/cart" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition">
            <ShoppingCart className="h-5 w-5" />
          </Link>

          {authenticated ? (
            <div className="flex items-center gap-3 ml-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition border border-gray-200 dark:border-slate-700"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                  {(user?.name || user?.fullName || user?.role || "U").charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold hidden md:inline text-gray-800 dark:text-slate-200">
                  {user?.name || user?.fullName || "Account"}
                </span>
              </Link>

              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition shadow-sm"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium text-sm transition"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
