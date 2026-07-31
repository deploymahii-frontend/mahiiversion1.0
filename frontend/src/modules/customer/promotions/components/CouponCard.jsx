import { Tag, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function CouponCard({ coupon }) {
  if (!coupon) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success(`Coupon code '${coupon.code}' copied!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-dashed border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 mt-0.5">
          <Tag size={24} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {coupon.title || "Special Offer"}
          </span>
          <h3 className="font-extrabold text-slate-800 text-lg mt-1">{coupon.code}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Min Order: ₹{coupon.minimumOrder || 199} • Valid till {coupon.expiresAt || "Soon"}
          </p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
      >
        Copy Code
      </button>
    </div>
  );
}
