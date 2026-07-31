import { MapPin } from "lucide-react";

export default function AddressCard({ address }) {
  if (!address) return null;

  const label = address.label || "Delivery Address";
  const details = typeof address === "string" ? address : address.fullAddress || address.address;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 mt-0.5">
          <MapPin size={22} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{label}</h4>
          <p className="text-sm text-slate-500 mt-1">{details}</p>
        </div>
      </div>
    </section>
  );
}
