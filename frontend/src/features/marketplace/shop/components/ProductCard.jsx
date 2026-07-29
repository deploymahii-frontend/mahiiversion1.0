import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../../../../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isVeg = product.foodType === "VEG";
  const isAvailable = product.isAvailable !== false;
  const displayPrice = Number(product.discountedPrice ?? 0) > 0
    ? Number(product.discountedPrice)
    : Number(product.price ?? 0);
  const originalPrice = Number(product.discountedPrice ?? 0) > 0
    ? Number(product.price ?? 0)
    : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.images?.[0] ?? "/images/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
          {isVeg ? "Veg" : "Non Veg"}
        </span>
      </div>

      <div className="flex items-center gap-1 text-sm text-yellow-500">
        <FaStar />
        <span className="text-gray-700">{product.rating || "4.5"}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-gray-900">
        {product.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {product.category || product.description}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">
            ₹{displayPrice}
          </p>
          {originalPrice !== null && (
            <p className="text-sm text-gray-400 line-through">
              ₹{originalPrice}
            </p>
          )}
        </div>

        <div className="text-sm text-gray-500">
          {product.preparationTime ? `${product.preparationTime} min` : "-"}
        </div>
      </div>

      <button
        onClick={() => addToCart(product)}
        disabled={!isAvailable}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${isAvailable ? "bg-orange-500 hover:bg-orange-600" : "cursor-not-allowed bg-gray-400"}`}
      >
        <FiShoppingCart size={16} />
        {isAvailable ? "Add To Cart" : "Unavailable"}
      </button>
    </div>
  );
}
