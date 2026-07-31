import { MapPin } from "lucide-react";

export default function DeliveryAddressCard({ address }) {
  if (!address) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h4 className="font-bold text-slate-800 text-sm mb-3">Delivery Destination</h4>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
          <MapPin size={18} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{address.label || "Home"}</p>
          <p className="text-xs text-slate-500 mt-0.5">{address.address || address}</p>
        </div>
      </div>
    </section>
  );
}
