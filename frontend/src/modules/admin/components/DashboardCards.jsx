import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function DashboardCards({ data }) {
  const cards = [
    {
      title: "Total Users",
      value: data?.users ?? 0,
      change: "+12%",
      trend: "up",
      icon: FiUsers,
    },
    {
      title: "Total Shops",
      value: data?.shops ?? 0,
      change: "+8%",
      trend: "up",
      icon: FiShoppingBag,
    },
    {
      title: "Orders Today",
      value: data?.ordersToday ?? 0,
      change: data?.ordersToday > 0 ? "+5%" : "0%",
      trend: data?.ordersToday > 0 ? "up" : "neutral",
      icon: FiActivity,
    },
    {
      title: "Revenue",
      value: `₹${(data?.revenue ?? 0).toLocaleString("en-IN")}`,
      change: "+18%",
      trend: "up",
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-lg border border-[#222] bg-[#0A0A0A] p-5 transition-all hover:border-[#333] group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#888] uppercase tracking-wider font-medium">{card.title}</span>
              <span className={`flex items-center gap-1 text-xs font-medium ${
                card.trend === "up" ? "text-emerald-400" : card.trend === "down" ? "text-red-400" : "text-[#888]"
              }`}>
                {card.trend === "up" ? <FiTrendingUp size={12} /> : card.trend === "down" ? <FiTrendingDown size={12} /> : null}
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#ededed] tracking-tight">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
