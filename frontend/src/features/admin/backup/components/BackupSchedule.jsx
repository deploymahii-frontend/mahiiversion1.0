import { useState } from "react";

export default function BackupSchedule({
  loading,
  data = {},
  onSaveSchedule,
  onRunBackupNow,
}) {
  const schedule = data.schedule || {};

  const [form, setForm] = useState({
    enabled: schedule.enabled ?? true,
    frequency: schedule.frequency ?? "DAILY",
    backupType: schedule.backupType ?? "INCREMENTAL",
    executionTime: schedule.executionTime ?? "02:00",
    retentionDays: schedule.retentionDays ?? 30,
    storageTarget: schedule.storageTarget ?? "Primary Cloud",
    notifyOnFailure: schedule.notifyOnFailure ?? true,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading backup schedule...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Backup Schedule
        </h2>

        <p className="text-gray-500">
          Configure automated backup operations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <label className="flex flex-col gap-2">
          <span>Frequency</span>

          <select
            value={form.frequency}
            onChange={(e) =>
              updateField("frequency", e.target.value)
            }
            className="rounded-lg border p-3"
          >
            <option>HOURLY</option>
            <option>DAILY</option>
            <option>WEEKLY</option>
            <option>MONTHLY</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span>Backup Type</span>

          <select
            value={form.backupType}
            onChange={(e) =>
              updateField("backupType", e.target.value)
            }
            className="rounded-lg border p-3"
          >
            <option>FULL</option>
            <option>INCREMENTAL</option>
            <option>DIFFERENTIAL</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span>Execution Time</span>

          <input
            type="time"
            value={form.executionTime}
            onChange={(e) =>
              updateField("executionTime", e.target.value)
            }
            className="rounded-lg border p-3"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span>Retention (Days)</span>

          <input
            type="number"
            min="1"
            value={form.retentionDays}
            onChange={(e) =>
              updateField(
                "retentionDays",
                Number(e.target.value)
              )
            }
            className="rounded-lg border p-3"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span>Storage Target</span>

          <input
            type="text"
            value={form.storageTarget}
            onChange={(e) =>
              updateField("storageTarget", e.target.value)
            }
            className="rounded-lg border p-3"
          />
        </label>

      </div>

      <div className="mt-6 space-y-4">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              updateField("enabled", e.target.checked)
            }
          />

          Enable Scheduled Backups
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.notifyOnFailure}
            onChange={(e) =>
              updateField(
                "notifyOnFailure",
                e.target.checked
              )
            }
          />

          Notify Administrators on Failure
        </label>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() => onSaveSchedule?.(form)}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Save Schedule
        </button>

        <button
          onClick={onRunBackupNow}
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          Run Backup Now
        </button>

      </div>

    </div>
  );
}
