import { useEffect, useState } from "react";

const AVAILABLE_LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Kannada",
  "Tamil",
  "Telugu",
];

export default function LocalizationSettings({
  loading,
  data = {},
  onSave,
}) {
  const [form, setForm] = useState({
    defaultLanguage: "English",
    supportedLanguages: ["English"],
    timezone: "Asia/Kolkata",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24 Hour",
    firstDayOfWeek: "Monday",
    numberFormat: "1,23,456.78",
  });

  useEffect(() => {
    if (data.localization) {
      setForm({
        defaultLanguage:
          data.localization.defaultLanguage || "English",
        supportedLanguages:
          data.localization.supportedLanguages || ["English"],
        timezone:
          data.localization.timezone || "Asia/Kolkata",
        currency:
          data.localization.currency || "INR",
        dateFormat:
          data.localization.dateFormat || "DD/MM/YYYY",
        timeFormat:
          data.localization.timeFormat || "24 Hour",
        firstDayOfWeek:
          data.localization.firstDayOfWeek || "Monday",
        numberFormat:
          data.localization.numberFormat ||
          "1,23,456.78",
      });
    }
  }, [data]);

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleLanguage = (language) => {
    const exists = form.supportedLanguages.includes(language);

    update(
      "supportedLanguages",
      exists
        ? form.supportedLanguages.filter(
            (item) => item !== language
          )
        : [...form.supportedLanguages, language]
    );
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading localization settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Localization Settings
        </h2>

        <p className="text-gray-500">
          Configure language, timezone, currency, and regional formatting.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Default Language
          </label>

          <select
            value={form.defaultLanguage}
            onChange={(e) =>
              update("defaultLanguage", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            {AVAILABLE_LANGUAGES.map((language) => (
              <option key={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Time Zone
          </label>

          <input
            value={form.timezone}
            onChange={(e) =>
              update("timezone", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Currency
          </label>

          <select
            value={form.currency}
            onChange={(e) =>
              update("currency", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Date Format
          </label>

          <select
            value={form.dateFormat}
            onChange={(e) =>
              update("dateFormat", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Time Format
          </label>

          <select
            value={form.timeFormat}
            onChange={(e) =>
              update("timeFormat", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>24 Hour</option>
            <option>12 Hour</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            First Day of Week
          </label>

          <select
            value={form.firstDayOfWeek}
            onChange={(e) =>
              update("firstDayOfWeek", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">
          Supported Languages
        </h3>

        <div className="grid gap-3 md:grid-cols-3">

          {AVAILABLE_LANGUAGES.map((language) => (
            <label
              key={language}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={form.supportedLanguages.includes(language)}
                onChange={() => toggleLanguage(language)}
              />
              {language}
            </label>
          ))}

        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Localization Settings
        </button>
      </div>

    </div>
  );
}
