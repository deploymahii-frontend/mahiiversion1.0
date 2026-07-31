import { Phone, MessageSquare, UserCheck } from "lucide-react";

export default function DeliveryPartnerCard({ partner }) {
  if (!partner) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 overflow-hidden">
          {partner.avatar ? (
            <img src={partner.avatar} alt={partner.name} className="h-full w-full object-cover" />
          ) : (
            <UserCheck size={28} />
          )}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{partner.name || "Delivery Executive"}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{partner.vehicle || "Delivery Partner"}</p>
          {partner.rating && (
            <span className="inline-block mt-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              ★ {partner.rating}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {partner.phone && (
          <a
            href={`tel:${partner.phone}`}
            className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
          >
            <Phone size={18} />
          </a>
        )}
        <button
          className="p-3 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          onClick={() => alert("Chat functionality coming soon!")}
        >
          <MessageSquare size={18} />
        </button>
      </div>
    </section>
  );
}
