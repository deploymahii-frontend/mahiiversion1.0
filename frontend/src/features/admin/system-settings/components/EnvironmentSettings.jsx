import { useEffect, useState } from "react";

export default function EnvironmentSettings({ loading, data = {}, onSave }) {
  const [form, setForm] = useState({
    environment: "Production",
    apiBaseUrl: "",
    webBaseUrl: "",
    adminBaseUrl: "",
    logLevel: "INFO",
    debugMode: false,
    maintenanceApi: false,
    telemetryEnabled: true,
    cacheEnabled: true,
    rateLimiting: true,
    corsEnabled: true,
  });

  useEffect(() => {
    if (data.environment) {
      setForm({
        environment: data.environment.environment || "Production",
        apiBaseUrl: data.environment.apiBaseUrl || "",
        webBaseUrl: data.environment.webBaseUrl || "",
        adminBaseUrl: data.environment.adminBaseUrl || "",
        logLevel: data.environment.logLevel || "INFO",
        debugMode: data.environment.debugMode ?? false,
        maintenanceApi: data.environment.maintenanceApi ?? false,
        telemetryEnabled: data.environment.telemetryEnabled ?? true,
        cacheEnabled: data.environment.cacheEnabled ?? true,
        rateLimiting: data.environment.rateLimiting ?? true,
        corsEnabled: data.environment.corsEnabled ?? true,
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
        Loading environment settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Environment Settings</h2>
        <p className="text-gray-500">
          Runtime configuration and operational controls.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Environment</label>
          <select
            value={form.environment}
            onChange={(e) => update("environment", e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>Development</option>
            <option>Staging</option>
            <option>Production</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Log Level</label>
          <select
            value={form.logLevel}
            onChange={(e) => update("logLevel", e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>DEBUG</option>
            <option>INFO</option>
            <option>WARN</option>
            <option>ERROR</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">API Base URL</label>
          <input
            value={form.apiBaseUrl}
            onChange={(e) => update("apiBaseUrl", e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">Website URL</label>
          <input
            value={form.webBaseUrl}
            onChange={(e) => update("webBaseUrl", e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">Admin URL</label>
          <input
            value={form.adminBaseUrl}
            onChange={(e) => update("adminBaseUrl", e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {[
          ["debugMode", "Enable Debug Mode"],
          ["maintenanceApi", "Maintenance API"],
          ["telemetryEnabled", "Telemetry"],
          ["cacheEnabled", "Application Cache"],
          ["rateLimiting", "Rate Limiting"],
          ["corsEnabled", "CORS Protection"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => update(key, e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Environment Settings
        </button>
      </div>
    </div>
  );
}
