import { Home, Briefcase, MapPin, Trash2, Edit2 } from "lucide-react";

const icons = {
  HOME: Home,
  WORK: Briefcase,
  OTHER: MapPin,
};

export default function AddressCard({ address, onDelete }) {
  if (!address) return null;

  const Icon = icons[address.type] || icons[address.label?.toUpperCase()] || MapPin;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-start justify-between">
      <div className="flex gap-4">
        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 mt-0.5">
          <Icon size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">{address.label || "Address"}</h3>
            {address.isDefault && (
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm mt-1">{address.addressLine || address.address}</p>
          {address.city && (
            <p className="text-xs text-slate-400 mt-0.5">
              {address.city}, {address.state} - {address.postalCode}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition">
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete?.(address._id)}
          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-50 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </section>
  );
}
