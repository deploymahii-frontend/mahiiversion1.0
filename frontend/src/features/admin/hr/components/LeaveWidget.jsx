export default function LeaveWidget({ leave = {} }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Leave Requests</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="mt-2 text-2xl font-semibold">{leave.pending ?? 0}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="mt-2 text-2xl font-semibold">{leave.approved ?? 0}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {(leave.requests || []).slice(0, 3).map((request) => (
          <div key={request.id} className="rounded-xl border p-4">
            <p className="font-semibold">{request.employee}</p>
            <p className="text-sm text-gray-500">{request.type} • {request.days} days</p>
          </div>
        ))}
      </div>
    </div>
  );
}
