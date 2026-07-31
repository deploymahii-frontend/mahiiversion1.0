import { MapPin } from "lucide-react";

export default function EmptyAddress({ onAdd }) {
  return (
    <section className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
        <MapPin size={40} />
      </div>

      <h2 className="text-2xl font-black text-slate-800 mt-6">No Saved Addresses</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
        Add your home, work, or frequent delivery locations for faster checkout.
      </p>

      <button
        onClick={onAdd}
        className="mt-6 inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-700 transition"
      >
        Add Address Now
      </button>
    </section>
  );
}
