import { useState } from "react";
import toast from "react-hot-toast";

export default function PromoCodeInput() {
  const [code, setCode] = useState("");

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }
    toast.success(`Coupon code '${code.toUpperCase()}' applied!`);
    setCode("");
  };

  return (
    <form onSubmit={handleApply} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter Promo Code (e.g. SAVE20)"
        className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold uppercase text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </form>
  );
}
