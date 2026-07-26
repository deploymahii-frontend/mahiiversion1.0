import { motion } from "framer-motion";

export default function HRStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-indigo-600",
  bg = "bg-indigo-50",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900">{value}</h3>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
          )}

        </div>

        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${bg}`}>
          <Icon className={`text-3xl ${color}`} />
        </div>

      </div>
    </motion.div>
  );
}
