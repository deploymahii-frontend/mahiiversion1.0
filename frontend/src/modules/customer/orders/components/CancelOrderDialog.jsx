import { useState } from "react";
import useCancelOrder from "../hooks/useCancelOrder";
import { AlertTriangle } from "lucide-react";

export default function CancelOrderDialog({ orderId, isOpen, onClose }) {
  const [reason, setReason] = useState("");
  const cancelOrderMutation = useCancelOrder();

  if (!isOpen) return null;

  const handleCancel = () => {
    cancelOrderMutation.mutate(
      { id: orderId, reason },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={24} />
          <h3 className="text-xl font-bold">Cancel Order</h3>
        </div>

        <p className="text-sm text-slate-500">
          Are you sure you want to cancel this order? Please state your reason below.
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation..."
          className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-24"
        />

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Go Back
          </button>
          <button
            onClick={handleCancel}
            disabled={cancelOrderMutation.isPending}
            className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition"
          >
            {cancelOrderMutation.isPending ? "Cancelling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
