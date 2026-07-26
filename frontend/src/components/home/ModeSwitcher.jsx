import { motion } from "framer-motion";
import { FaGraduationCap, FaCarSide } from "react-icons/fa";

const modes = [
  {
    id: "student",
    title: "Student Mode",
    subtitle: "Budget meals • Monthly mess",
    icon: <FaGraduationCap size={28} />,
    color: "from-orange-500 to-orange-400",
  },
  {
    id: "travel",
    title: "Travel Mode",
    subtitle: "Tea • Parking • Breakfast",
    icon: <FaCarSide size={28} />,
    color: "from-blue-500 to-cyan-400",
  },
];

export default function ModeSwitcher() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-3xl bg-gradient-to-r ${mode.color} text-white p-6 shadow-lg text-left`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{mode.title}</h3>
                <p className="mt-2 text-white/90 text-sm">{mode.subtitle}</p>
              </div>

              <div className="bg-white/20 rounded-2xl p-4">
                {mode.icon}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
