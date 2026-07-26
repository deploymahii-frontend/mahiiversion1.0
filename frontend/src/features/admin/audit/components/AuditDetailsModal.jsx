export default function AuditDetailsModal({
  open,
  log,
  onClose,
}) {
  if (!open || !log) return null;

  function JsonBlock(data) {
    return (
      <pre className="overflow-auto rounded-xl bg-gray-100 p-4 text-sm">
        {JSON.stringify(data || {}, null, 2)}
      </pre>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Audit Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">
              General Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>Action:</strong>{" "}
                {log.action}
              </p>

              <p>
                <strong>Module:</strong>{" "}
                {log.module}
              </p>

              <p>
                <strong>Administrator:</strong>{" "}
                {log.performedBy?.name || "System"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {log.performedBy?.email || "-"}
              </p>

              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(log.createdAt).toLocaleString()}
              </p>

            </div>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">
              Request Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>IP Address:</strong>{" "}
                {log.ipAddress || "-"}
              </p>

              <p>
                <strong>User Agent:</strong>{" "}
                {log.userAgent || "-"}
              </p>

              <p>
                <strong>Target:</strong>{" "}
                {log.target?.type}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {log.target?.name}
              </p>

              <p>
                <strong>Target ID:</strong>{" "}
                {log.target?._id || "-"}
              </p>

            </div>
          </div>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Before
            </h3>

            {JsonBlock(log.before)}

          </div>

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              After
            </h3>

            {JsonBlock(log.after)}

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
