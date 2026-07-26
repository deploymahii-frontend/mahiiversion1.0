import OrderActions from "./OrderActions";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderDetailsModal({ order, onClose, onStatusChange }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">Order #{order?.orderNumber || order?.id}</p>
            <h2 className="mt-1 text-2xl font-bold">{order?.customer?.name || order?.customerName || "Customer"}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-semibold">{order?.customer?.name || order?.customerName || "Customer"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{order?.customer?.phone || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Items</p>
              <div className="mt-2 space-y-2">
                {(order?.items || []).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item?.quantity || 1} x {item?.name || "Item"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold">{order?.paymentMethod || "UPI_DIRECT"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p className="font-semibold">{order?.paymentStatus || "PAID"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Type</p>
              <p className="font-semibold">{order?.deliveryType || "Delivery"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Notes</p>
              <p className="font-semibold">{order?.notes || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="mt-1">
                <OrderStatusBadge status={order?.orderStatus || order?.status} />
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order?.subtotal || 0}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{order?.tax || 0}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>₹{order?.discount || 0}</span></div>
              <div className="mt-2 flex justify-between font-semibold"><span>Total</span><span>₹{order?.total || order?.amount || 0}</span></div>
            </div>
          </div>
        </div>

        <OrderActions order={order} onUpdate={onStatusChange} />
      </div>
    </div>
  );
}
