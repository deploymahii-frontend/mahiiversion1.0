import { Clock, CheckCircle2, MessageSquareWarning } from "lucide-react";

export default function TicketCard({ ticket }) {
  if (!ticket) return null;

  const isResolved = ticket.status === "RESOLVED" || ticket.status === "CLOSED";
  const isInReview = ticket.status === "IN_REVIEW";

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">#{ticket._id}</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
            {ticket.category}
          </span>
        </div>
        <h4 className="font-bold text-slate-800 text-sm mt-1">{ticket.title}</h4>
        <p className="text-xs text-slate-400 mt-1">Created on {ticket.createdAt}</p>
      </div>

      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
        isResolved ? "bg-emerald-50 text-emerald-600" : isInReview ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
      }`}>
        {isResolved ? <CheckCircle2 size={14} /> : isInReview ? <MessageSquareWarning size={14} /> : <Clock size={14} />}
        <span>{ticket.status}</span>
      </div>
    </div>
  );
}
