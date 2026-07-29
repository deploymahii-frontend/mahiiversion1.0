export default function AssignAgentModal({ isOpen, agents, onClose, onAssign }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Assign Agent</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
        </div>

        <div className="space-y-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onAssign(agent.id)}
              className="w-full rounded-3xl border border-slate-200 p-4 text-left hover:border-blue-400"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.role}</p>
                </div>
                <span className="text-sm text-slate-600">{agent.openTickets} open</span>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-6 text-right">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
