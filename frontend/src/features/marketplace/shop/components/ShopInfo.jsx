import { FaStar } from "react-icons/fa";
import { FiTruck, FiClock } from "react-icons/fi";

export default function ShopInfo({ shop }) {
  if (!shop) return null;

  return (
    <div className="p-6 border-b bg-white rounded-3xl shadow-sm">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{shop.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{shop.category || "Local store"}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          shop.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {shop.isOpen ? "Open" : "Closed"}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span>{shop.rating != null ? shop.rating.toFixed(1) : "0.0"} ({shop.reviewCount || 0})</span>
        </div>

        <div className="flex items-center gap-2">
          <FiTruck className="text-gray-500" />
          <span>Delivery • {shop.deliveryTime || "N/A"}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiClock className="text-gray-500" />
          <span>{shop.deliveryTime || "Opening hours"}</span>
        </div>

        <div>
          Min. Order: ₹{shop.minimumOrder ?? shop.deliverySettings?.minimumOrder ?? 0}
        </div>
      </div>
    </div>
  );
}
