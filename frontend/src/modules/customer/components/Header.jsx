import { Menu, Search, Bell, MapPin, Sun, Moon, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function Header({ onMenu }) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const nameInitial = user?.name ? user.name.charAt(0).toUpperCase() : "C";

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-16 flex items-center justify-between px-4 lg:px-8 gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-500 rounded-2xl px-4 h-11 flex-1 max-w-md transition-all border border-transparent dark:border-slate-700">
          <Search size={18} className="text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none ml-3 flex-1 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="Search food, restaurants, mess..."
          />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Go to Home Page Button */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition"
            title="Go to Marketplace Home"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Location Badge */}
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <MapPin size={14} className="text-blue-600 dark:text-blue-400" />
            <span>Kolhapur</span>
          </button>

          {/* Notifications Link */}
          <Link
            to="/customer/notifications"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </Link>

          {/* User Profile Avatar Link */}
          <Link
            to="/customer/profile"
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-blue-500 transition"
            title={user?.name || "Customer Profile"}
          >
            {user?.avatar || user?.profilePicture ? (
              <img
                src={user.avatar || user.profilePicture}
                alt={user.name || "User Profile"}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {nameInitial}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
