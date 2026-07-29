import { motion } from "framer-motion";
import { FaGraduationCap, FaCarSide } from "react-icons/fa";

const modes = [
  {
    id: "student",
    title: "Student Mode",
    icon: <FaGraduationCap size={22} />,
    color: "from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/30"
  },
  {
    id: "travel",
    title: "Travel Mode",
    icon: <FaCarSide size={22} />,
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/30"
  },
];

export default function ModeSwitcher() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-6">
      <div className="flex items-center gap-6">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${mode.color} text-white flex items-center justify-center shadow-lg ${mode.shadow} group-hover:shadow-xl transition-all`}>
              {mode.icon}
            </div>
            <span className="text-[11px] font-bold text-gray-700 dark:text-slate-300">{mode.title}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
