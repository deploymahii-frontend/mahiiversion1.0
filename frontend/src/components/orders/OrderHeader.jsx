export default function OrderHeader({ order }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h1 className="text-3xl font-bold">{order.orderNumber}</h1>

      <div className="mt-4 flex flex-wrap gap-5">
        <span>
          Status:
          <strong className="ml-2 text-orange-500">{order.orderStatus}</strong>
        </span>

        <span>
          Payment:
          <strong className="ml-2">{order.paymentStatus}</strong>
        </span>
      </div>
    </div>
  );
}
