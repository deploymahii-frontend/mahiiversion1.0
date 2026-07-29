import { useEffect, useState } from "react";

export default function GeneralSettings({
  loading,
  data = {},
  onSave,
}) {
  const [form, setForm] = useState({
    platformName: "",
    platformDescription: "",
    websiteUrl: "",
    supportEmail: "",
    supportPhone: "",
    logoUrl: "",
    faviconUrl: "",
    defaultLanguage: "en",
  });

  useEffect(() => {
    if (data.general) {
      setForm({
        platformName: data.general.platformName || "",
        platformDescription:
          data.general.platformDescription || "",
        websiteUrl: data.general.websiteUrl || "",
        supportEmail: data.general.supportEmail || "",
        supportPhone: data.general.supportPhone || "",
        logoUrl: data.general.logoUrl || "",
        faviconUrl: data.general.faviconUrl || "",
        defaultLanguage:
          data.general.defaultLanguage || "en",
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
        Loading general settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          General Settings
        </h2>

        <p className="text-gray-500">
          Configure platform branding and public
          information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Platform Name
          </label>

          <input
            value={form.platformName}
            onChange={(e) =>
              update("platformName", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Website URL
          </label>

          <input
            value={form.websiteUrl}
            onChange={(e) =>
              update("websiteUrl", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Platform Description
          </label>

          <textarea
            rows={4}
            value={form.platformDescription}
            onChange={(e) =>
              update(
                "platformDescription",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Support Email
          </label>

          <input
            value={form.supportEmail}
            onChange={(e) =>
              update("supportEmail", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Support Phone
          </label>

          <input
            value={form.supportPhone}
            onChange={(e) =>
              update("supportPhone", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Logo URL
          </label>

          <input
            value={form.logoUrl}
            onChange={(e) =>
              update("logoUrl", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Favicon URL
          </label>

          <input
            value={form.faviconUrl}
            onChange={(e) =>
              update("faviconUrl", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Default Language
          </label>

          <select
            value={form.defaultLanguage}
            onChange={(e) =>
              update(
                "defaultLanguage",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save General Settings
        </button>

      </div>

    </div>
  );
}
