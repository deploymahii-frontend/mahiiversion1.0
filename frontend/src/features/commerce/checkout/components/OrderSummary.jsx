import useCart from "../../../core/cart/useCart";

export default function OrderSummary() {
  const {
    items,
    subtotal,
    tax,
    deliveryCharge,
    discount,
    grandTotal,
  } = useCart();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{deliveryCharge}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
