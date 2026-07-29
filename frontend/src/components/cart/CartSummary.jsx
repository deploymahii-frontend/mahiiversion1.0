import { useNavigate } from "react-router-dom";

export default function CartSummary({ cart }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 sticky top-5">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      <div className="space-y-3 mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{cart.subTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{cart.tax}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{cart.deliveryCharge}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>₹{cart.grandTotal}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-8 bg-orange-500 text-white py-4 rounded-2xl font-bold"
      >
        Proceed To Checkout
      </button>
    </div>
  );
}
