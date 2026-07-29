function StatusBadge({ status }) {
  const styles = {
    READY: "bg-green-100 text-green-700",
    WARNING: "bg-yellow-100 text-yellow-700",
    CRITICAL: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function DisasterRecovery({
  loading,
  data = {},
  onRunRecoveryDrill,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading disaster recovery...
      </div>
    );
  }

  const recovery = data.disasterRecovery || {};
  const drills = recovery.drills || [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Disaster Recovery
          </h2>

          <p className="text-gray-500">
            Recovery readiness and failover status.
          </p>
        </div>

        <button
          onClick={onRunRecoveryDrill}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Run Recovery Drill
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Recovery Status
          </p>

          <div className="mt-3">
            <StatusBadge status={recovery.status} />
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            RTO
          </p>

          <p className="mt-3 text-2xl font-bold">
            {recovery.rto || "--"}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            RPO
          </p>

          <p className="mt-3 text-2xl font-bold">
            {recovery.rpo || "--"}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Failover
          </p>

          <p className="mt-3 text-2xl font-bold">
            {recovery.failover || "--"}
          </p>
        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Recovery Drill History
        </h3>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-left">
                  Duration
                </th>

                <th className="px-4 py-3 text-left">
                  Result
                </th>

                <th className="px-4 py-3 text-left">
                  Notes
                </th>

              </tr>

            </thead>

            <tbody>

              {drills.map((drill) => (

                <tr
                  key={drill.id}
                  className="border-b"
                >

                  <td className="px-4 py-4">
                    {new Date(
                      drill.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    {drill.duration}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge
                      status={drill.result}
                    />
                  </td>

                  <td className="px-4 py-4">
                    {drill.notes}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
