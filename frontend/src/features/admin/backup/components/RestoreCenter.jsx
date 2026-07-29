import { useState } from "react";

export default function RestoreCenter({
  loading,
  data = {},
  onStartRestore,
  onCancelRestore,
}) {
  const restorePoints = data.restorePoints || [];

  const [selectedBackup, setSelectedBackup] = useState("");
  const [restoreMode, setRestoreMode] = useState("FULL");
  const [validateBeforeRestore, setValidateBeforeRestore] =
    useState(true);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading restore center...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Restore Center
        </h2>

        <p className="text-gray-500">
          Restore data safely from available backup points.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <label className="flex flex-col gap-2">
          <span>Restore Point</span>

          <select
            value={selectedBackup}
            onChange={(e) =>
              setSelectedBackup(e.target.value)
            }
            className="rounded-lg border p-3"
          >
            <option value="">
              Select Backup
            </option>

            {restorePoints.map((backup) => (
              <option
                key={backup.id}
                value={backup.id}
              >
                {backup.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span>Restore Mode</span>

          <select
            value={restoreMode}
            onChange={(e) =>
              setRestoreMode(e.target.value)
            }
            className="rounded-lg border p-3"
          >
            <option value="FULL">
              Full Restore
            </option>

            <option value="PARTIAL">
              Partial Restore
            </option>
          </select>
        </label>

      </div>

      <div className="mt-6">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={validateBeforeRestore}
            onChange={(e) =>
              setValidateBeforeRestore(
                e.target.checked
              )
            }
          />

          Validate backup before restore
        </label>

      </div>

      {data.activeRestore && (

        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                Restore In Progress
              </h3>

              <p className="text-sm text-gray-600">
                {data.activeRestore.status}
              </p>

            </div>

            <span className="text-xl font-bold">
              {data.activeRestore.progress}%
            </span>

          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full bg-blue-600"
              style={{
                width: `${data.activeRestore.progress}%`,
              }}
            />

          </div>

          <button
            onClick={onCancelRestore}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Cancel Restore
          </button>

        </div>

      )}

      <div className="mt-8">

        <button
          disabled={!selectedBackup}
          onClick={() =>
            onStartRestore?.({
              backupId: selectedBackup,
              mode: restoreMode,
              validate: validateBeforeRestore,
            })
          }
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start Restore
        </button>

      </div>

    </div>
  );
}
