import { FaStar } from "react-icons/fa";
import { FiTruck, FiClock } from "react-icons/fi";

export default function ShopInfo({ shop }) {
  if (!shop) return null;

  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{shop.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{shop.category}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          shop.isOpen 
            ? "bg-green-100 text-green-700" 
            : "bg-red-100 text-red-700"
        }`}>
          {shop.isOpen ? "Open" : "Closed"}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span>{shop.rating.toFixed(1)} ({shop.reviewCount})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <FiTruck className="text-gray-500" />
          <span>Delivery • {shop.distance || "Nearby"}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiClock className="text-gray-500" />
          <span>{shop.deliveryTime}</span>
        </div>

        <div>
          Min. Order: ₹{shop.minimumOrder}
        </div>
      </div>
    </div>
  );
}
