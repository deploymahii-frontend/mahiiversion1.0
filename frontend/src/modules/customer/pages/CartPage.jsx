// src/modules/customer/pages/CartPage.jsx

import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import CartItem from "./Cart/components/CartItem";
import CartSummary from "./Cart/components/CartSummary";

export default function CartPage() {
    const { cart, loading, increase, decrease, remove, clear } = useCart();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!cart || !cart.items?.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
                <p className="mt-3 text-gray-500">
                    Add a few items from your favorite shops to get started.
                </p>
                <Link
                    to="/explore"
                    className="mt-8 inline-flex rounded-3xl bg-blue-600 px-8 py-3 text-white shadow hover:bg-blue-700"
                >
                    Explore Shops
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <section className="lg:w-2/3 space-y-6">
                        <div className="rounded-3xl bg-white p-6 shadow-sm">
                            <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
                            <p className="mt-2 text-gray-500">{cart.items.length} items in your cart</p>
                        </div>

                        {cart.items.map((item) => (
                            <CartItem
                                key={item.product || item.id}
                                item={item}
                                increase={increase}
                                decrease={decrease}
                                remove={remove}
                            />
                        ))}
                    </section>

                    <aside className="lg:w-1/3 space-y-6">
                        <CartSummary cart={cart} />
                        <button
                            type="button"
                            className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-white font-semibold shadow hover:bg-blue-700"
                        >
                            Proceed to Checkout
                        </button>
                    </aside>
                </div>

                <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900">Need help?</h2>
                    <p className="mt-3 text-gray-500">
                        If you have any questions about your order, our support team is ready to help.
                    </p>
                </div>
            </div>
        </main>
    );
}
