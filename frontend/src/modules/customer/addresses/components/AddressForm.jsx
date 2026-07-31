import { useState } from "react";
import toast from "react-hot-toast";

export default function AddressForm({ isOpen, onClose }) {
  const [label, setLabel] = useState("Home");
  const [addressLine, setAddressLine] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressLine) {
      toast.error("Please fill in the address.");
      return;
    }
    toast.success("New address saved!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Add New Address</h3>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Label</label>
          <div className="flex gap-2 mt-1">
            {["Home", "Work", "Other"].map((lbl) => (
              <button
                key={lbl}
                type="button"
                onClick={() => setLabel(lbl)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  label === lbl ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Address Line</label>
          <textarea
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="House/Flat No, Landmark, Street Name..."
            className="w-full mt-1 border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}
