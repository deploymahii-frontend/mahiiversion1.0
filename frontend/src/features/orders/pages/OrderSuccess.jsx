import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderSuccess() {
  const { state } = useLocation();

  const order = state?.order;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center p-6">
      <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm">
        <FiCheckCircle size={72} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-3xl font-bold">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for ordering with Mahii.
        </p>

        {order && (
          <div className="mt-8 rounded-xl bg-gray-50 p-5">
            <div className="flex justify-between">
              <span>Order Number</span>
              <strong>{order.orderNumber}</strong>
            </div>

            <div className="mt-3 flex justify-between">
              <span>Total Amount</span>
              <strong>₹{order.totalAmount}</strong>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/orders/${order?._id}`}
            className="flex-1 rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white hover:bg-orange-600"
          >
            View Order
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl border px-5 py-3 text-center font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
