import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    loading,
    increase,
    decrease,
    remove,
    clear,
  } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Cart...
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <FiShoppingCart size={80} className="text-orange-500 mb-6" />

        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/explore"
          className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Explore Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Cart</h1>

          <p className="text-gray-500 mt-2">{cart.items.length} items</p>
        </div>

        <button onClick={clear} className="text-red-500 font-semibold">
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              increase={increase}
              decrease={decrease}
              remove={remove}
            />
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
