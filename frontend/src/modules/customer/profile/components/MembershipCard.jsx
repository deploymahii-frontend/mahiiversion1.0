import { Crown, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function MembershipCard({ membership = {} }) {
  const plan = membership.plan || "Mahii Gold";
  const expiresAt = membership.expiresAt || "Jan 2027";

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={24} />
            <h3 className="font-extrabold text-xl">{plan} Membership</h3>
          </div>
          <p className="text-amber-100 text-sm mt-2">Free Delivery + Extra 10% OFF on all mess subscriptions.</p>
          <p className="text-xs text-amber-200 mt-4">Valid until: {expiresAt}</p>
        </div>

        <Link
          to="/customer/membership"
          className="px-4 py-2 bg-white text-amber-700 font-bold text-xs rounded-xl shadow-sm hover:bg-amber-50 transition"
        >
          Manage Plan
        </Link>
      </div>
    </section>
  );
}
