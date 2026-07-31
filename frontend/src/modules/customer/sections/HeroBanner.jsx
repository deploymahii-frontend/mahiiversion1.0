import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({ user }) {
  const navigate = useNavigate();
  const name = user?.name || "there";
  const isGold = user?.isGold;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 md:p-10 text-white"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-xl">
        {isGold && (
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-yellow-200 text-sm font-semibold mb-4">
            <Crown size={16} />
            Gold Member
          </div>
        )}

        <p className="text-white/80 text-lg font-medium">{greeting},</p>
        <h1 className="text-4xl md:text-5xl font-black mt-1 leading-tight">
          {name.split(" ")[0]}! 👋
        </h1>
        <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
          Discover your favorite restaurants, mess, cafes, bakeries & more — all nearby.
        </p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/explore")}
            className="rounded-xl bg-white px-6 py-3 text-blue-700 font-bold flex items-center gap-2 hover:bg-blue-50 transition shadow-lg shadow-blue-900/20"
          >
            <Sparkles size={18} />
            Explore Now
          </button>
          <button
            onClick={() => navigate("/customer/orders")}
            className="rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-3 text-white font-semibold flex items-center gap-2 hover:bg-white/25 transition"
          >
            My Orders
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
