import { useState } from "react";
import useOrders from "../../hooks/useOrders";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailsModal from "../components/orders/OrderDetailsModal";
import OrderFilters from "../components/orders/OrderFilters";

export default function Orders() {
  const shopId = "1";
  const { orders, loading, updateStatus } = useOrders(shopId);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Placed", "Accepted", "Preparing", "Ready", "Delivered"];

  const filteredOrders = orders.filter((order) => {
    if (filter === "All") return true;
    return order.status === filter;
  });

  if (loading) {
    return <div className="p-8">Loading Orders...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <OrderFilters filters={filters} activeFilter={filter} onChange={setFilter} />

      <OrderTable orders={filteredOrders} onView={(order) => setSelectedOrder(order)} />

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={updateStatus}
      />
    </div>
  );
}

