import { FiBell, FiMapPin, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const HeroHeader = ({
  user = { name: "Mahesh" },
  location = "Kolhapur, Maharashtra",
}) => {
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-b-3xl shadow-md"
    >
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-500 font-semibold">
              {emoji} {greeting}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {user.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Discover what's worth visiting today ✨
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-full bg-orange-50 hover:bg-orange-100 transition flex items-center justify-center">
              <FiBell size={22} className="text-orange-600" />
            </button>

            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-700 px-4 py-2 font-medium hover:bg-orange-200 transition">
          <FiMapPin />
          {location}
          <FiChevronDown />
        </button>
      </div>
    </motion.header>
  );
};

export default HeroHeader;
