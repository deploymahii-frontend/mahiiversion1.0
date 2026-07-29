import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, onView }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-500">#{order?.orderNumber || order?.id}</p>
          <h3 className="mt-1 text-lg font-bold text-gray-900">
            {order?.customer?.name || order?.customerName || "Customer"}
          </h3>
        </div>
        <OrderStatusBadge status={order?.orderStatus || order?.status} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          <p>₹{order?.total || order?.amount || 0}</p>
          <p>{order?.items?.length || order?.itemCount || 0} Items</p>
        </div>
        <button
          onClick={() => onView(order)}
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
