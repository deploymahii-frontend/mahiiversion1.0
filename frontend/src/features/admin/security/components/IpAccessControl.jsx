import { useMemo, useState } from "react";

function TypeBadge({ type }) {
  const styles = {
    ALLOW: "bg-green-100 text-green-700",
    BLOCK: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type}
    </span>
  );
}

export default function IpAccessControl({
  loading,
  data = {},
  onAddRule,
  onDeleteRule,
}) {
  const [search, setSearch] = useState("");

  const rules = data.ipRules || [];

  const filteredRules = useMemo(() => {
    const query = search.toLowerCase();

    return rules.filter((rule) => {
      return (
        rule.ip.toLowerCase().includes(query) ||
        rule.reason.toLowerCase().includes(query)
      );
    });
  }, [rules, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading IP access rules...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            IP Access Control
          </h2>

          <p className="text-gray-500">
            Manage allowlist and blocklist rules.
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search IP or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-4 py-2"
          />

          <button
            onClick={onAddRule}
            className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Add Rule
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">IP / CIDR</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Created By</th>
              <th className="px-4 py-3 text-left">Expires</th>
              <th className="px-4 py-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredRules.map((rule) => (

              <tr
                key={rule.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {rule.ip}
                </td>

                <td className="px-4 py-4">
                  <TypeBadge type={rule.type} />
                </td>

                <td className="px-4 py-4">
                  {rule.reason}
                </td>

                <td className="px-4 py-4">
                  {rule.createdBy}
                </td>

                <td className="px-4 py-4">
                  {rule.expiresAt || "Never"}
                </td>

                <td className="px-4 py-4 text-right">

                  <button
                    onClick={() =>
                      onDeleteRule?.(rule.id)
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
