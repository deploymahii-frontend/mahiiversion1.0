import { useState } from "react";
import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import OrderFilters from "../components/OrderFilters";
import { ACTIVE_STATUSES } from "../constants/orderStatus";

export default function OrdersPage() {
  const [filter, setFilter] = useState("ALL");
  const { data: orders = [], isLoading } = useOrders();

  const filteredOrders = orders.filter((order) => {
    if (filter === "ACTIVE") return ACTIVE_STATUSES.includes(order.status);
    if (filter === "DELIVERED") return order.status === "DELIVERED";
    if (filter === "CANCELLED") return order.status === "CANCELLED";
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-10 w-full max-w-sm bg-slate-200 dark:bg-slate-800 rounded-full" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">My Orders</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage your order history</p>
      </div>

      <OrderFilters activeFilter={filter} onFilterChange={setFilter} />

      {!filteredOrders.length ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900 transition-colors">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No orders found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {filter === "ALL"
              ? "You haven't placed any orders yet."
              : `No orders matching filter '${filter.toLowerCase()}'.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id || order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
