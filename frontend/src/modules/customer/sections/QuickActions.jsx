import { ShoppingBag, Heart, Wallet, MapPin, Bell, User, Gift, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  { title: "Orders", icon: ShoppingBag, path: "/customer/orders", bg: "bg-blue-50 dark:bg-blue-950/60", color: "text-blue-600 dark:text-blue-400", ring: "ring-blue-200 dark:ring-blue-900/50" },
  { title: "Wishlist", icon: Heart, path: "/customer/wishlist", bg: "bg-rose-50 dark:bg-rose-950/60", color: "text-rose-500 dark:text-rose-400", ring: "ring-rose-200 dark:ring-rose-900/50" },
  { title: "Wallet", icon: Wallet, path: "/customer/wallet", bg: "bg-emerald-50 dark:bg-emerald-950/60", color: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-200 dark:ring-emerald-900/50" },
  { title: "Addresses", icon: MapPin, path: "/customer/addresses", bg: "bg-orange-50 dark:bg-orange-950/60", color: "text-orange-500 dark:text-orange-400", ring: "ring-orange-200 dark:ring-orange-900/50" },
  { title: "Rewards", icon: Gift, path: "/customer/rewards", bg: "bg-amber-50 dark:bg-amber-950/60", color: "text-amber-600 dark:text-amber-400", ring: "ring-amber-200 dark:ring-amber-900/50" },
  { title: "Alerts", icon: Bell, path: "/customer/notifications", bg: "bg-purple-50 dark:bg-purple-950/60", color: "text-purple-600 dark:text-purple-400", ring: "ring-purple-200 dark:ring-purple-900/50" },
  { title: "Profile", icon: User, path: "/customer/profile", bg: "bg-slate-100 dark:bg-slate-800", color: "text-slate-600 dark:text-slate-300", ring: "ring-slate-200 dark:ring-slate-700" },
  { title: "Support", icon: HelpCircle, path: "/customer/support", bg: "bg-cyan-50 dark:bg-cyan-950/60", color: "text-cyan-600 dark:text-cyan-400", ring: "ring-cyan-200 dark:ring-cyan-900/50" },
];

export default function QuickActions() {
  return (
    <section>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {actions.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center gap-2.5 group hover:scale-[1.05]"
              >
                <div className={`rounded-2xl p-3 ${item.bg} ${item.color} ring-1 ${item.ring} group-hover:scale-110 transition`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
