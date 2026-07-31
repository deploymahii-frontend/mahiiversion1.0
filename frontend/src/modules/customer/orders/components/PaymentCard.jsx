import { CreditCard, CheckCircle, Clock } from "lucide-react";

export default function PaymentCard({ payment }) {
  const method = payment?.method || "Online Payment";
  const status = payment?.status || "SUCCESS";
  const transactionId = payment?.transactionId || "N/A";

  const isSuccess = status === "SUCCESS" || status === "PAID";

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <CreditCard size={22} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{method}</h4>
            <p className="text-xs text-slate-400 mt-0.5">Txn: {transactionId}</p>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          isSuccess ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
        }`}>
          {isSuccess ? <CheckCircle size={14} /> : <Clock size={14} />}
          <span>{isSuccess ? "PAID" : "PENDING"}</span>
        </div>
      </div>
    </section>
  );
}
