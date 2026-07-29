import { useState } from "react";
import { FiBell, FiMapPin, FiChevronDown, FiLogIn, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LocationPickerModal from "../common/LocationPickerModal";

const HeroHeader = ({
  location = "Kolhapur, Maharashtra",
}) => {
  const { user, authenticated } = useAuth();
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem("mahii_user_location") || location;
  });

  const handleLocationSelect = (newLoc) => {
    setSelectedLocation(newLoc);
    localStorage.setItem("mahii_user_location", newLoc);
  };

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
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => setIsLocationModalOpen(true)}>
                <FiMapPin className="text-orange-500 text-lg sm:text-xl" />
                <h1 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition line-clamp-1 max-w-[200px] sm:max-w-[300px]">
                  {selectedLocation.split(',')[0]}
                </h1>
                <FiChevronDown className="text-gray-500 group-hover:text-orange-500 transition" />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1 ml-6 max-w-[200px] sm:max-w-[300px]">
                {selectedLocation}
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm transition"
                >
                  <FiLogIn size={14} />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
        currentLocation={selectedLocation}
      />
    </motion.header>
  );
};

export default HeroHeader;
