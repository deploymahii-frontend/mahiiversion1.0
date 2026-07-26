import { useMemo, useState } from "react";

const SEVERITY_STYLES = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

function SeverityBadge({ severity }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        SEVERITY_STYLES[severity] || "bg-gray-100 text-gray-700"
      }`}
    >
      {severity}
    </span>
  );
}

export default function ThreatDetection({
  loading,
  data = {},
  onAcknowledge,
  onResolve,
}) {
  const [filter, setFilter] = useState("ALL");

  const threats = data.threats || [];

  const filteredThreats = useMemo(() => {
    if (filter === "ALL") return threats;

    return threats.filter(
      (threat) => threat.severity === filter
    );
  }, [filter, threats]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading threat detection...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Threat Detection
          </h2>

          <p className="text-gray-500">
            Monitor and respond to security threats.
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>

      </div>

      <div className="space-y-4">

        {filteredThreats.map((threat) => (

          <div
            key={threat.id}
            className="rounded-xl border border-gray-200 p-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h3 className="text-lg font-semibold">
                  {threat.title}
                </h3>

                <p className="mt-1 text-gray-500">
                  {threat.description}
                </p>

              </div>

              <SeverityBadge severity={threat.severity} />

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <div>
                <p className="text-xs text-gray-500">
                  Source
                </p>

                <p className="font-medium">
                  {threat.source}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Detected At
                </p>

                <p className="font-medium">
                  {new Date(
                    threat.detectedAt
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="font-medium">
                  {threat.status}
                </p>
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={() =>
                  onAcknowledge?.(threat.id)
                }
                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                Acknowledge
              </button>

              <button
                onClick={() =>
                  onResolve?.(threat.id)
                }
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Resolve
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
