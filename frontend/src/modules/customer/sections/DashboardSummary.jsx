import { Wallet, ShoppingBag, Gift, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Wallet Balance",
    icon: Wallet,
    key: "balance",
    prefix: "₹",
    path: "/customer/wallet",
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-400/20",
  },
  {
    title: "Total Orders",
    icon: ShoppingBag,
    key: "totalOrders",
    prefix: "",
    path: "/customer/orders",
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-400/20",
  },
  {
    title: "Reward Points",
    icon: Gift,
    key: "rewardPoints",
    prefix: "",
    path: "/customer/rewards",
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-400/20",
  },
  {
    title: "Wishlist",
    icon: Heart,
    key: "wishlistCount",
    prefix: "",
    path: "/customer/wishlist",
    gradient: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-400/20",
  },
];

export default function DashboardSummary({ data = {} }) {
  return (
    <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => {
        const Icon = item.icon;
        const value = data[item.key] ?? 0;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              className={`
                block rounded-3xl bg-gradient-to-br ${item.gradient}
                p-6 text-white shadow-lg
                hover:shadow-xl hover:scale-[1.02]
                transition-all duration-300
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                    {item.title}
                  </p>
                  <h2 className="text-3xl font-black mt-3">
                    {item.prefix}
                    {typeof value === "number" ? value.toLocaleString() : value}
                  </h2>
                </div>
                <div className={`${item.iconBg} rounded-2xl p-3`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-white/70 text-xs font-medium">
                <TrendingUp size={12} />
                <span>View details →</span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}
