export default function CreateTicketModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Ticket</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Subject</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 p-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Customer</label>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 p-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea className="mt-2 w-full rounded-2xl border border-slate-200 p-3" rows="4" />
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={onCreate}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Create Ticket
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
