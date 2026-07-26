import { useEffect, useState } from "react";

export default function EmailSettings({
  loading,
  data = {},
  onSave,
  onSendTestEmail,
}) {
  const [form, setForm] = useState({
    provider: "SMTP",
    host: "",
    port: 587,
    username: "",
    password: "",
    encryption: "TLS",
    senderName: "",
    senderEmail: "",
  });

  useEffect(() => {
    if (data.email) {
      setForm({
        provider: data.email.provider || "SMTP",
        host: data.email.host || "",
        port: data.email.port || 587,
        username: data.email.username || "",
        password: "",
        encryption: data.email.encryption || "TLS",
        senderName: data.email.senderName || "",
        senderEmail: data.email.senderEmail || "",
      });
    }
  }, [data]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading email settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Email Settings
        </h2>

        <p className="text-gray-500">
          Configure SMTP and transactional email delivery.
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
              updateField("provider", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="SMTP">SMTP</option>
            <option value="SendGrid">SendGrid</option>
            <option value="Mailgun">Mailgun</option>
            <option value="Amazon SES">Amazon SES</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            SMTP Host
          </label>

          <input
            type="text"
            value={form.host}
            onChange={(e) =>
              updateField("host", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Port
          </label>

          <input
            type="number"
            value={form.port}
            onChange={(e) =>
              updateField("port", Number(e.target.value))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Encryption
          </label>

          <select
            value={form.encryption}
            onChange={(e) =>
              updateField("encryption", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="TLS">TLS</option>
            <option value="SSL">SSL</option>
            <option value="NONE">None</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Username
          </label>

          <input
            type="text"
            value={form.username}
            onChange={(e) =>
              updateField("username", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              updateField("password", e.target.value)
            }
            placeholder="••••••••"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Sender Name
          </label>

          <input
            type="text"
            value={form.senderName}
            onChange={(e) =>
              updateField("senderName", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Sender Email
          </label>

          <input
            type="email"
            value={form.senderEmail}
            onChange={(e) =>
              updateField("senderEmail", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
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
          onClick={() => onSendTestEmail?.()}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Send Test Email
        </button>

      </div>

    </div>
  );
}
