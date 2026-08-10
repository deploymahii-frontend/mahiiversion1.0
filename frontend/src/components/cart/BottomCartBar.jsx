import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import useCart from "../../hooks/useCart";

export default function BottomCartBar() {
  const { totalItems = 0, subtotal = 0, total = 0 } = useCart();
  const displayTotal = total || subtotal || 0;

  if (!totalItems || totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slide-up">
      <Link
        to="/cart"
        className="flex items-center justify-between bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white p-4 rounded-2xl shadow-2xl border border-white/20 hover:scale-[1.02] transition-transform duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-white text-sm">
            <FiShoppingBag size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-white/90">
              {totalItems} ITEM{totalItems > 1 ? "S" IN Cart : ""} IN CART
            </p>
            <p className="text-lg font-black text-white leading-none mt-0.5">
              ₹{displayTotal.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-black text-sm bg-white text-orange-600 px-4 py-2 rounded-xl shadow-md">
          <span>View Cart</span>
          <FiArrowRight size={16} />
        </div>
      </Link>
    </div>
  );
}
