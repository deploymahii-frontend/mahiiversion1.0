import { useEffect, useState } from "react";

export default function SecuritySettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    minimumPasswordLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
    sessionTimeout: 30,
    enforceTwoFactor: false,
    enableAuditLogs: true,
  });

  useEffect(() => {
    setForm({
      minimumPasswordLength:
        settings.minimumPasswordLength ?? 8,
      requireUppercase:
        settings.requireUppercase ?? true,
      requireNumbers:
        settings.requireNumbers ?? true,
      requireSpecialCharacters:
        settings.requireSpecialCharacters ?? true,
      sessionTimeout:
        settings.sessionTimeout ?? 30,
      enforceTwoFactor:
        settings.enforceTwoFactor ?? false,
      enableAuditLogs:
        settings.enableAuditLogs ?? true,
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
      security: form,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        Security Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Minimum Password Length
          </label>

          <input
            type="number"
            min="6"
            max="64"
            value={form.minimumPasswordLength}
            onChange={(e) =>
              updateField(
                "minimumPasswordLength",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Session Timeout (minutes)
          </label>

          <input
            type="number"
            min="5"
            value={form.sessionTimeout}
            onChange={(e) =>
              updateField(
                "sessionTimeout",
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {[
          {
            key: "requireUppercase",
            label: "Require uppercase letters",
          },
          {
            key: "requireNumbers",
            label: "Require numbers",
          },
          {
            key: "requireSpecialCharacters",
            label: "Require special characters",
          },
          {
            key: "enforceTwoFactor",
            label: "Require two-factor authentication for administrators",
          },
          {
            key: "enableAuditLogs",
            label: "Enable audit logs",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <span>{item.label}</span>

            <input
              type="checkbox"
              checked={form[item.key]}
              onChange={(e) =>
                updateField(item.key, e.target.checked)
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Security Settings"}
        </button>
      </div>
    </form>
  );
}
