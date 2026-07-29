import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
      <div className="text-6xl">🎉</div>

      <h1 className="text-3xl font-bold mt-5">Order Placed Successfully</h1>

      <p className="text-gray-500 mt-2">
        Thank you for ordering with Mahii.
      </p>

      <Link
        to="/orders"
        className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl"
      >
        View My Orders
      </Link>
    </div>
  );
}
