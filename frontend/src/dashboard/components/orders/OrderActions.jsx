const nextStatus = {
  PLACED: "ACCEPTED",
  ACCEPTED: "PREPARING",
  PREPARING: "READY",
  READY: "COMPLETED",
};

export default function OrderActions({ order, onUpdate }) {
  if (order.orderStatus === "COMPLETED" || order.orderStatus === "CANCELLED") {
    return null;
  }

  return (
    <div className="mt-4 flex gap-3">
      <button
        onClick={() => onUpdate(order._id, nextStatus[order.orderStatus])}
        className="rounded-xl bg-black px-4 py-2 text-white"
      >
        Mark as {nextStatus[order.orderStatus]}
      </button>

      {order.orderStatus === "PLACED" && (
        <button
          onClick={() => onUpdate(order._id, "CANCELLED")}
          className="rounded-xl bg-red-500 px-4 py-2 text-white"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
