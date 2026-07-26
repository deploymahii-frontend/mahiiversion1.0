import { useEffect, useState } from "react";

export default function MaintenanceMode({ loading = false, data = {}, onSave }) {
  const [form, setForm] = useState({
    enabled: false,
    title: "Scheduled Maintenance",
    message:
      "Mahii is temporarily unavailable while we improve your experience. Please check back shortly.",
    startTime: "",
    endTime: "",
    allowAdmins: true,
    bypassIps: "",
    estimatedDurationMinutes: 60,
  });

  useEffect(() => {
    if (data.maintenance) {
      setForm({
        enabled: data.maintenance.enabled ?? false,
        title: data.maintenance.title || "Scheduled Maintenance",
        message: data.maintenance.message || "Mahii is temporarily unavailable.",
        startTime: data.maintenance.startTime || "",
        endTime: data.maintenance.endTime || "",
        allowAdmins: data.maintenance.allowAdmins ?? true,
        bypassIps: data.maintenance.bypassIps || "",
        estimatedDurationMinutes: data.maintenance.estimatedDurationMinutes || 60,
      });
    }
  }, [data]);

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading maintenance settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Maintenance Mode</h2>
        <p className="text-gray-500">
          Temporarily restrict access during upgrades or maintenance.
        </p>
      </div>

      <div className="space-y-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => update("enabled", e.target.checked)}
          />

          <span className="font-medium">Enable Maintenance Mode</span>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Maintenance Title</label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Estimated Duration (Minutes)
            </label>
            <input
              type="number"
              value={form.estimatedDurationMinutes}
              onChange={(e) =>
                update("estimatedDurationMinutes", Number(e.target.value))
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Start Time</label>
            <input
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => update("startTime", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">End Time</label>
            <input
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => update("endTime", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Maintenance Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">IP Allowlist (comma separated)</label>
            <input
              value={form.bypassIps}
              onChange={(e) => update("bypassIps", e.target.value)}
              placeholder="203.0.113.10,198.51.100.20"
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.allowAdmins}
            onChange={(e) => update("allowAdmins", e.target.checked)}
          />

          <span>Allow administrators to bypass maintenance mode</span>
        </label>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Maintenance Settings
        </button>
      </div>
    </div>
  );
}
