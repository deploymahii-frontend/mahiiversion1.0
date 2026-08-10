import { useState } from "react";
import useCheckout from "../hooks/useCheckout";
import useCart from "../hooks/useCart";
import { FiMapPin, FiTruck, FiShoppingBag, FiCreditCard, FiDollarSign, FiFileText, FiCheckCircle, FiShield } from "react-icons/fi";

export default function Checkout() {
  const { loading, placeOrder } = useCheckout();
  const { items = [], subtotal = 0, total = 0 } = useCart();
  const displayTotal = total || subtotal || 0;

  const [form, setForm] = useState({
    deliveryType: "SHOP_DELIVERY",
    paymentMethod: "CASH",
    deliveryAddress: {
      fullName: "",
      mobile: "",
      addressLine: "",
      area: "",
      city: "Kolhapur",
      state: "Maharashtra",
      pincode: "",
      landmark: "",
    },
    notes: "",
  });

  function submit(e) {
    e.preventDefault();
    placeOrder(form);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Checkout</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complete your delivery address and choose your payment method
          </p>
        </div>

        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Type Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FiTruck className="text-orange-500" /> Delivery Preference
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, deliveryType: "SHOP_DELIVERY" })}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition ${
                    form.deliveryType === "SHOP_DELIVERY"
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-300 ring-2 ring-orange-500/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <FiTruck size={20} className={form.deliveryType === "SHOP_DELIVERY" ? "text-orange-500" : "text-slate-400"} />
                    {form.deliveryType === "SHOP_DELIVERY" && <FiCheckCircle size={18} className="text-orange-500" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">Doorstep Delivery</p>
                    <p className="text-[11px] opacity-75">Delivered directly to your address</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, deliveryType: "PICKUP" })}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition ${
                    form.deliveryType === "PICKUP"
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-300 ring-2 ring-orange-500/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <FiShoppingBag size={20} className={form.deliveryType === "PICKUP" ? "text-orange-500" : "text-slate-400"} />
                    {form.deliveryType === "PICKUP" && <FiCheckCircle size={18} className="text-orange-500" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">Store Takeaway</p>
                    <p className="text-[11px] opacity-75">Self-pickup from shop location</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Address Details */}
            {form.deliveryType === "SHOP_DELIVERY" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FiMapPin className="text-orange-500" /> Delivery Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                    <input
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.fullName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, fullName: e.target.value },
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.mobile}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, mobile: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Flat / House / Street Address *</label>
                  <input
                    placeholder="e.g. Flat 302, Green Valley Apartments, Rajarampuri"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                    value={form.deliveryAddress.addressLine}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deliveryAddress: { ...form.deliveryAddress, addressLine: e.target.value },
                      })
                    }
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Area / Locality *</label>
                    <input
                      placeholder="e.g. Tarabai Park"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.area}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, area: e.target.value },
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                    <input
                      placeholder="e.g. Kolhapur"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.city}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, city: e.target.value },
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pincode *</label>
                    <input
                      placeholder="e.g. 416008"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.pincode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, pincode: e.target.value },
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Landmark (Optional)</label>
                    <input
                      placeholder="e.g. Near DY Patil College"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                      value={form.deliveryAddress.landmark}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: { ...form.deliveryAddress, landmark: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FiCreditCard className="text-orange-500" /> Select Payment Method
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  form.paymentMethod === "CASH"
                    ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-300 font-bold"
                    : "border-slate-200 dark:border-slate-800 dark:text-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CASH"
                      checked={form.paymentMethod === "CASH"}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-emerald-600" size={18} />
                      <span>Cash on Delivery (COD) / Pay at Pickup</span>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  form.paymentMethod === "UPI_DIRECT"
                    ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-300 font-bold"
                    : "border-slate-200 dark:border-slate-800 dark:text-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI_DIRECT"
                      checked={form.paymentMethod === "UPI_DIRECT"}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-purple-600 border border-purple-300 px-1.5 py-0.5 rounded">UPI</span>
                      <span>UPI Direct (Google Pay, PhonePe, Paytm)</span>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  form.paymentMethod === "RAZORPAY"
                    ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-300 font-bold"
                    : "border-slate-200 dark:border-slate-800 dark:text-slate-300"
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="RAZORPAY"
                      checked={form.paymentMethod === "RAZORPAY"}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-2">
                      <FiCreditCard className="text-blue-500" size={18} />
                      <span>Cards / NetBanking / Razorpay</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <FiFileText className="text-orange-500" /> Delivery / Cooking Instructions
              </h2>
              <textarea
                placeholder="e.g. Ring doorbell, less spicy, leave at security gate..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          {/* Sidebar Order Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm sticky top-6 space-y-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Order Summary
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.name || item.productId?.name || "Item"}
                      </p>
                      <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      ₹{(item.price || item.productId?.price || 0) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-base font-black text-slate-900 dark:text-white">Total Amount</span>
                <span className="text-2xl font-black text-orange-600 dark:text-orange-500">₹{displayTotal}</span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                <FiShield size={18} className="shrink-0 text-emerald-600" />
                <span className="font-medium text-[11px]">Mahii Buyer Guarantee: Live order updates & shop support</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-orange-500/25 transition active:scale-98 disabled:opacity-50"
              >
                {loading ? "Placing Order..." : `Place Order (₹${displayTotal})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
