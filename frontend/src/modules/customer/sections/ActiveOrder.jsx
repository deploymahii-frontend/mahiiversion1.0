import { Clock3, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActiveOrder({ order }) {
  if (!order) return null;

  return (
    <section className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-green-100 text-sm font-medium">Active Order</p>
          <h2 className="mt-2 text-2xl font-bold">{order.shopName}</h2>
          <p className="mt-2 text-green-100">{order.status}</p>
          <div className="mt-5 flex gap-5 text-sm">
            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              {order.eta}
            </span>
            <span className="flex items-center gap-2">
              <Truck size={16} />
              Live Tracking
            </span>
          </div>
        </div>
        <Link
          to={`/customer/orders/${order._id}`}
          className="rounded-xl bg-white px-5 py-3 text-green-700 font-semibold flex items-center gap-2 hover:bg-green-50 transition"
        >
          Track
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
