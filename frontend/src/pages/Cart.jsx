import React from "react";
import useCart from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartState = useCart();

  const loading = cartState.loading;
  const items = cartState.items || cartState.cart?.items || [];
  const total = cartState.total ?? cartState.subtotal ?? 0;
  const clear = cartState.clearCart || cartState.clear;
  const updateQuantity = cartState.updateQuantity || cartState.increase;
  const removeFromCart = cartState.removeFromCart || cartState.remove;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your cart...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50 dark:bg-slate-900">
        <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-6">
          <FiShoppingCart size={48} className="text-orange-500" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Cart is Empty</h1>

        <p className="text-gray-500 dark:text-slate-400 mt-3 max-w-md">
          Explore delicious meals, fresh groceries, and daily essentials from trusted local shops in Kolhapur!
        </p>

        <Link
          to="/explore"
          className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition flex items-center gap-2"
        >
          <span>Explore Local Shops</span>
          <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Shopping Cart</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">{items.length} items in cart</p>
          </div>

          <button
            onClick={clear}
            className="text-red-500 hover:text-red-600 text-sm font-bold bg-red-50 dark:bg-red-950/40 px-4 py-2 rounded-xl transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, idx) => (
              <CartItem
                key={item.productId || item._id || item.product || idx}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <CartSummary cart={{ ...cartState, items, total }} />
        </div>
      </div>
    </div>
  );
}
