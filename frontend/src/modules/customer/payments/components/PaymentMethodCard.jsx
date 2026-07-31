import { CreditCard, Smartphone, Banknote, Trash2 } from "lucide-react";

export default function PaymentMethodCard({ method, onDelete }) {
  if (!method) return null;

  const isUPI = method.type === "UPI";
  const isCOD = method.type === "COD";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
          {isUPI ? <Smartphone size={24} /> : isCOD ? <Banknote size={24} /> : <CreditCard size={24} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-800">{method.displayName || method.provider || method.type}</h4>
            {method.isDefault && (
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{method.type} Payment</p>
        </div>
      </div>

      {!isCOD && (
        <button
          onClick={() => onDelete?.(method._id)}
          className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-50 transition"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}
