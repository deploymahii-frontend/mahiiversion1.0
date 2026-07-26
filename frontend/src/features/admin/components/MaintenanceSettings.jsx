import { useEffect, useState } from "react";

export default function MaintenanceSettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    maintenanceMode: false,
    maintenanceMessage:
      "We'll be back shortly. Thank you for your patience.",
    allowAdminAccess: true,
    scheduledStart: "",
    scheduledEnd: "",
  });

  useEffect(() => {
    setForm({
      maintenanceMode:
        settings.maintenanceMode ?? false,
      maintenanceMessage:
        settings.maintenanceMessage ||
        "We'll be back shortly. Thank you for your patience.",
      allowAdminAccess:
        settings.allowAdminAccess ?? true,
      scheduledStart:
        settings.scheduledStart || "",
      scheduledEnd: settings.scheduledEnd || "",
    });
  }, [settings]);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave?.({
      maintenance: form,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        Maintenance Settings
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <span className="font-medium">Enable Maintenance Mode</span>

          <input
            type="checkbox"
            checked={form.maintenanceMode}
            onChange={(e) =>
              updateField(
                "maintenanceMode",
                e.target.checked
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Maintenance Message
          </label>

          <textarea
            rows={4}
            value={form.maintenanceMessage}
            onChange={(e) =>
              updateField(
                "maintenanceMessage",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Scheduled Start
            </label>

            <input
              type="datetime-local"
              value={form.scheduledStart}
              onChange={(e) =>
                updateField(
                  "scheduledStart",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Scheduled End
            </label>

            <input
              type="datetime-local"
              value={form.scheduledEnd}
              onChange={(e) =>
                updateField(
                  "scheduledEnd",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <span className="font-medium">
            Allow Administrator Access
          </span>

          <input
            type="checkbox"
            checked={form.allowAdminAccess}
            onChange={(e) =>
              updateField(
                "allowAdminAccess",
                e.target.checked
              )
            }
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Maintenance Settings"}
        </button>
      </div>
    </form>
  );
}
