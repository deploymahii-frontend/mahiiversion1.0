import { useMemo, useState } from "react";

const STATUS_STYLES = {
  SUCCESS: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  RUNNING: "bg-blue-100 text-blue-700",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function BackupHistory({
  loading,
  data = {},
  onRestore,
  onDownloadMetadata,
}) {
  const [search, setSearch] = useState("");

  const backups = data.history || [];

  const filteredBackups = useMemo(() => {
    const query = search.toLowerCase();

    return backups.filter((backup) =>
      backup.type.toLowerCase().includes(query)
    );
  }, [backups, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading backup history...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Backup History
          </h2>

          <p className="text-gray-500">
            Review previous backup operations.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search backup type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredBackups.map((backup) => (

              <tr
                key={backup.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {backup.type}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={backup.status} />
                </td>

                <td className="px-4 py-4">
                  {backup.size}
                </td>

                <td className="px-4 py-4">
                  {backup.duration}
                </td>

                <td className="px-4 py-4">
                  {new Date(
                    backup.createdAt
                  ).toLocaleString()}
                </td>

                <td className="px-4 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onDownloadMetadata?.(backup.id)
                      }
                      className="rounded-lg border px-3 py-2 hover:bg-gray-100"
                    >
                      Metadata
                    </button>

                    <button
                      onClick={() =>
                        onRestore?.(backup.id)
                      }
                      className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                    >
                      Restore
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
