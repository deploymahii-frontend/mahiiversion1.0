import { useEffect, useState } from "react";

export default function SmsSettings({
  loading,
  data = {},
  onSave,
  onSendTestSms,
}) {
  const [form, setForm] = useState({
    provider: "MSG91",
    apiKey: "",
    senderId: "",
    route: "Transactional",
    countryCode: "+91",
    enabled: true,
  });

  useEffect(() => {
    if (data.sms) {
      setForm({
        provider: data.sms.provider || "MSG91",
        apiKey: "",
        senderId: data.sms.senderId || "",
        route: data.sms.route || "Transactional",
        countryCode: data.sms.countryCode || "+91",
        enabled: data.sms.enabled ?? true,
      });
    }
  }, [data]);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading SMS settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          SMS Settings
        </h2>

        <p className="text-gray-500">
          Configure SMS providers for OTPs and notifications.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Provider
          </label>

          <select
            value={form.provider}
            onChange={(e) =>
              update("provider", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="MSG91">MSG91</option>
            <option value="Twilio">Twilio</option>
            <option value="Textlocal">Textlocal</option>
            <option value="AWS SNS">AWS SNS</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Sender ID
          </label>

          <input
            type="text"
            value={form.senderId}
            onChange={(e) =>
              update("senderId", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            API Key / Token
          </label>

          <input
            type="password"
            value={form.apiKey}
            onChange={(e) =>
              update("apiKey", e.target.value)
            }
            placeholder="••••••••••"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Route
          </label>

          <select
            value={form.route}
            onChange={(e) =>
              update("route", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="Transactional">
              Transactional
            </option>

            <option value="Promotional">
              Promotional
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Default Country Code
          </label>

          <input
            type="text"
            value={form.countryCode}
            onChange={(e) =>
              update("countryCode", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex items-center pt-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) =>
                update("enabled", e.target.checked)
              }
            />

            Enable SMS Service
          </label>
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Settings
        </button>

        <button
          onClick={() => onSendTestSms?.()}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Send Test SMS
        </button>

      </div>

    </div>
  );
}
