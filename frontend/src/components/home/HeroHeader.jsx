import { FiBell, FiMapPin, FiChevronDown, FiLogIn, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeroHeader = ({
  location = "Kolhapur, Maharashtra",
}) => {
  const { user, authenticated } = useAuth();
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  let emoji = "🌆";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    emoji = "☀️";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
    emoji = "🌇";
  } else {
    greeting = "Good Night";
    emoji = "🌙";
  }

  const userName = user?.name || user?.fullName || user?.phone || "Guest";

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white dark:bg-slate-900 rounded-b-3xl shadow-md border-b border-gray-100 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <p className="text-sm text-orange-500 font-semibold flex items-center gap-1">
              <span>{emoji}</span> {greeting}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {authenticated ? userName : "Welcome to Mahii"}
            </h1>

            <p className="text-gray-500 dark:text-slate-400 mt-2">
              Discover trusted local shops, restaurants, messes & nearby services ✨
            </p>
          </div>

          <div className="flex items-center gap-3">
            {authenticated ? (
              <>
                <button className="w-11 h-11 rounded-full bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 transition flex items-center justify-center">
                  <FiBell size={22} className="text-orange-600 dark:text-orange-400" />
                </button>

                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md transition"
                >
                  <FiLogIn />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium transition"
                >
                  <FiUserPlus />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 px-4 py-2 font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
          <FiMapPin />
          {location}
          <FiChevronDown />
        </button>
      </div>
    </motion.header>
  );
};

export default HeroHeader;
