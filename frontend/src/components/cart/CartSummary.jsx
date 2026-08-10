import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiTag, FiCheckCircle, FiShield, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";

export default function CartSummary({ cart }) {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const items = cart?.items || [];
  const rawSubtotal = cart?.subtotal ?? cart?.subTotal ?? cart?.total ?? 0;
  
  const deliveryCharge = rawSubtotal > 299 || rawSubtotal === 0 ? 0 : 25;
  const platformFee = rawSubtotal > 0 ? 5 : 0;
  const tax = Math.round(rawSubtotal * 0.05); // 5% GST standard
  
  const finalTotal = Math.max(0, rawSubtotal + deliveryCharge + platformFee + tax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    const code = couponCode.trim().toUpperCase();
    if (code === "MAHII50" || code === "WELCOME50" || code === "SWARAG50") {
      const disc = Math.min(50, rawSubtotal);
      setDiscount(disc);
      setAppliedCoupon(code);
      toast.success(`Coupon "${code}" applied! You saved ₹${disc}`);
    } else if (code === "FREEDEL") {
      setDiscount(deliveryCharge);
      setAppliedCoupon(code);
      toast.success(`Free Delivery coupon applied! Saved ₹${deliveryCharge}`);
    } else {
      toast.error("Invalid promo coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon("");
    setCouponCode("");
    toast.success("Coupon removed");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-6 space-y-6">
      <h2 className="text-xl font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        Bill Details
      </h2>

      {/* Coupon Promo Input */}
      <div>
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Promo Code (e.g. MAHII50)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={!!appliedCoupon}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white uppercase"
            />
          </div>
          {appliedCoupon ? (
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="px-4 py-2.5 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 rounded-xl text-xs font-bold hover:bg-rose-100 transition"
            >
              Remove
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition"
            >
              Apply
            </button>
          )}
        </form>

        {appliedCoupon && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-900">
            <FiCheckCircle size={14} />
            <span>Coupon {appliedCoupon} applied (₹{discount} OFF)</span>
          </div>
        )}
      </div>

      {/* Item summary breakdown */}
      <div className="space-y-3 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Item Total ({items.length} item{items.length === 1 ? "" : "s"})</span>
          <span className="font-bold text-slate-900 dark:text-white">₹{rawSubtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <FiTruck size={13} className="text-orange-500" /> Delivery Fee
          </span>
          {deliveryCharge === 0 ? (
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">FREE</span>
          ) : (
            <span className="font-bold text-slate-900 dark:text-white">₹{deliveryCharge}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="font-bold text-slate-900 dark:text-white">₹{platformFee}</span>
        </div>

        <div className="flex justify-between">
          <span>Govt Taxes & GST (5%)</span>
          <span className="font-bold text-slate-900 dark:text-white">₹{tax}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Coupon Discount</span>
            <span>- ₹{discount}</span>
          </div>
        )}

        <hr className="border-slate-100 dark:border-slate-800 my-2" />

        <div className="flex justify-between items-baseline pt-1">
          <div>
            <span className="text-base font-black text-slate-900 dark:text-white">To Pay</span>
            <p className="text-[10px] text-slate-400">Includes all taxes and fees</p>
          </div>
          <span className="text-2xl font-black text-orange-600 dark:text-orange-500">₹{finalTotal}</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-3 flex items-center gap-3 text-xs text-orange-800 dark:text-orange-300">
        <FiShield className="text-orange-500 shrink-0" size={20} />
        <p className="text-[11px] font-medium leading-snug">
          100% Safe Payments & Direct Local Delivery Guarantee
        </p>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition active:scale-98"
      >
        <span>Proceed To Checkout</span>
        <FiArrowRight size={18} />
      </button>
    </div>
  );
}
