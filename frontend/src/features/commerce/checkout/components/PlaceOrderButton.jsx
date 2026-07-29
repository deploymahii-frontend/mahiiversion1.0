import useCheckout from "../hooks/useCheckout";

export default function PlaceOrderButton() {
  const { placeOrder, loading } = useCheckout();

  return (
    <button
      type="button"
      disabled={loading}
      onClick={placeOrder}
      className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
}
