import QuantitySelector from "./QuantitySelector";
import { FiShoppingCart, FiZap } from "react-icons/fi";

export default function ProductPurchaseCard({
  product,
  quantity,
  increase,
  decrease,
  addToCart,
  buyNow,
}) {
  const isAvailable =
    product.available !== false &&
    product.isAvailable !== false &&
    product.status !== "INACTIVE" &&
    product.status !== "OUT_OF_STOCK";

  const price = Number(product.price ?? 0);
  const total = price * quantity;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
              Total Price ({quantity} item{quantity > 1 ? "s" : ""})
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              ₹{total.toLocaleString("en-IN")}
            </h2>
          </div>

          <QuantitySelector
            quantity={quantity}
            onIncrease={increase}
            onDecrease={decrease}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={addToCart}
            disabled={!isAvailable}
            className={`py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition ${
              isAvailable
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                : "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed"
            }`}
          >
            <FiShoppingCart size={18} />
            {isAvailable ? "Add To Cart" : "Out Of Stock"}
          </button>

          <button
            onClick={buyNow}
            disabled={!isAvailable}
            className={`py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition ${
              isAvailable
                ? "border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40"
                : "border-2 border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed"
            }`}
          >
            <FiZap size={18} />
            {isAvailable ? "Buy Now" : "Out Of Stock"}
          </button>
        </div>
      </div>
    </section>
  );
}
