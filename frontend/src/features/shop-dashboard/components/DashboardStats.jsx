import {
  FiDollarSign,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import StatCard from "./StatCard";

export default function DashboardStats({
  stats = {
    revenue: "₹0",
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  },
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Today's Revenue"
        value={stats.revenue}
        icon={FiDollarSign}
        change="+12%"
      />

      <StatCard
        title="Today's Orders"
        value={stats.totalOrders}
        icon={FiShoppingBag}
        change="+8%"
      />

      <StatCard title="Pending Orders" value={stats.pendingOrders} icon={FiClock} />

      <StatCard
        title="Completed Orders"
        value={stats.completedOrders}
        icon={FiCheckCircle}
      />
    </div>
  );
}
