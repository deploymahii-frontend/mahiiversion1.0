import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

import StatCard from "./StatCard";

export default function AnalyticsCards({
  data = {},
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Revenue"
        value={`₹${data.totalRevenue || 0}`}
        icon={FiDollarSign}
        change={`${data.revenueGrowth || 0}%`}
        changeType={
          (data.revenueGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Orders"
        value={data.totalOrders || 0}
        icon={FiShoppingBag}
        change={`${data.orderGrowth || 0}%`}
        changeType={
          (data.orderGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Customers"
        value={data.totalCustomers || 0}
        icon={FiUsers}
        change={`${data.customerGrowth || 0}%`}
        changeType={
          (data.customerGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Growth"
        value={`${data.businessGrowth || 0}%`}
        icon={FiTrendingUp}
        change={`${data.businessGrowth || 0}%`}
        changeType={
          (data.businessGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

    </div>
  );
}
