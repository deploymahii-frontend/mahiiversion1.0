import { useState } from "react";
import toast from "react-hot-toast";

export default function AddMoneyDialog({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleAddMoney = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    toast.success(`Successfully added ₹${amount} to your wallet!`);
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add Money to Wallet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Enter the amount you would like to top up.</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (₹)"
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-lg font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-shadow"
        />

        <div className="flex gap-2">
          {[100, 200, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.toString())}
              className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              +₹{val}
            </button>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddMoney}
            className="flex-1 py-3 rounded-2xl bg-blue-600 dark:bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
