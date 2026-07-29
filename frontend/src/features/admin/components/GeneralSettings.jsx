import { useEffect, useState } from "react";

export default function GeneralSettings({
  settings = {},
  loading = false,
  onSave,
}) {
  const [form, setForm] = useState({
    appName: "",
    websiteUrl: "",
    supportEmail: "",
    supportPhone: "",
    logoUrl: "",
  });

  useEffect(() => {
    setForm({
      appName: settings.appName || "",
      websiteUrl: settings.websiteUrl || "",
      supportEmail: settings.supportEmail || "",
      supportPhone: settings.supportPhone || "",
      logoUrl: settings.logoUrl || "",
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
      general: form,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        General Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Platform Name
          </label>

          <input
            type="text"
            value={form.appName}
            onChange={(e) =>
              updateField(
                "appName",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Website URL
          </label>

          <input
            type="url"
            value={form.websiteUrl}
            onChange={(e) =>
              updateField(
                "websiteUrl",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Support Email
          </label>

          <input
            type="email"
            value={form.supportEmail}
            onChange={(e) =>
              updateField(
                "supportEmail",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Support Phone
          </label>

          <input
            type="tel"
            value={form.supportPhone}
            onChange={(e) =>
              updateField(
                "supportPhone",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Logo URL
          </label>

          <input
            type="url"
            value={form.logoUrl}
            onChange={(e) =>
              updateField(
                "logoUrl",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save General Settings"}
        </button>
      </div>
    </form>
  );
}
