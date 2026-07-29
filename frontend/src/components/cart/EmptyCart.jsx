import { useNavigate } from "react-router-dom";

export default function EmptyCart({ onClear }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-10 text-center">
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <p className="mt-3 text-gray-600">
        Add some products to continue shopping.
      </p>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/explore")}
          className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-semibold"
        >
          Continue Shopping
        </button>

        {onClear ? (
          <button
            onClick={onClear}
            className="border border-gray-300 px-6 py-3 rounded-2xl font-semibold"
          >
            Clear Cart
          </button>
        ) : null}
      </div>
    </div>
  );
}
