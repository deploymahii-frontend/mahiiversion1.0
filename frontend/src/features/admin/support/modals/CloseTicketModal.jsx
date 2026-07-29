export default function CloseTicketModal({ isOpen, ticket, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Close Ticket</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to close the ticket <strong>{ticket?.subject}</strong>?
          </p>
          <textarea
            className="mt-2 w-full rounded-2xl border border-slate-200 p-3"
            rows="4"
            placeholder="Add closing notes (optional)"
          />
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={onConfirm}
              className="rounded-xl bg-rose-600 px-5 py-3 text-white hover:bg-rose-700"
            >
              Confirm Close
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
