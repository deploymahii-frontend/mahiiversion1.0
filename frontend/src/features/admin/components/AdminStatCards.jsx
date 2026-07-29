import {
  FiUsers,
  FiShoppingBag,
  FiClipboard,
  FiDollarSign,
} from "react-icons/fi";

import StatCard from "../../shop-dashboard/components/StatCard";

export default function AdminStatCards({
  data = {},
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Users"
        value={data.totalUsers || 0}
        icon={FiUsers}
        change={`${data.userGrowth || 0}%`}
        changeType={
          (data.userGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Total Shops"
        value={data.totalShops || 0}
        icon={FiShoppingBag}
        change={`${data.shopGrowth || 0}%`}
        changeType={
          (data.shopGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Total Orders"
        value={data.totalOrders || 0}
        icon={FiClipboard}
        change={`${data.orderGrowth || 0}%`}
        changeType={
          (data.orderGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

      <StatCard
        title="Platform Revenue"
        value={`₹${data.totalRevenue || 0}`}
        icon={FiDollarSign}
        change={`${data.revenueGrowth || 0}%`}
        changeType={
          (data.revenueGrowth || 0) >= 0
            ? "positive"
            : "negative"
        }
      />

    </div>
  );
}
