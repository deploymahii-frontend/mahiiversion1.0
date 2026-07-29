export default function PaymentCard({ order }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Payment</h2>

      <p>
        Method:
        <strong className="ml-2">{order.paymentMethod}</strong>
      </p>

      <p className="mt-2">
        Status:
        <strong className="ml-2">{order.paymentStatus}</strong>
      </p>

      <h3 className="mt-6 text-2xl font-bold">₹{order.totalAmount}</h3>
    </div>
  );
}
