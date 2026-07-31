import { useEffect, useState } from "react";

const ENVIRONMENTS = [
  "Development",
  "Staging",
  "Production",
];

const ROLES = [
  "ADMIN",
  "SHOP_OWNER",
  "CUSTOMER",
  "DELIVERY_PARTNER",
];

export default function UpdateFeatureFlagModal({
  flag,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    key: "",
    description: "",
    enabled: false,
    rolloutPercentage: 0,
    environments: [],
    userRoles: [],
    countries: [],
    cities: [],
    startDate: "",
    endDate: "",
    changeReason: "",
  });

  useEffect(() => {
    if (!flag) return;

    setForm({
      name: flag.name || "",
      key: flag.key || "",
      description: flag.description || "",
      enabled: flag.enabled ?? false,
      rolloutPercentage: flag.rolloutPercentage ?? 0,
      environments: flag.environments || [],
      userRoles: flag.userRoles || [],
      countries: flag.countries || [],
      cities: flag.cities || [],
      startDate: flag.startDate || "",
      endDate: flag.endDate || "",
      changeReason: "",
    });
  }, [flag]);

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleArray = (field, value) => {
    update(
      field,
      form[field].includes(value)
        ? form[field].filter((item) => item !== value)
        : [...form[field], value]
    );
  };

  const save = () => {
    onSubmit?.({
      id: flag.id,
      ...form,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Update Feature Flag</h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            className="rounded-lg border p-3"
            value={form.name}
            placeholder="Feature Name"
            onChange={(e) => update("name", e.target.value)}
          />

          <input
            className="rounded-lg border p-3"
            value={form.key}
            placeholder="Feature Key"
            onChange={(e) => update("key", e.target.value)}
          />

          <textarea
            className="rounded-lg border p-3 md:col-span-2"
            rows={3}
            value={form.description}
            placeholder="Description"
            onChange={(e) => update("description", e.target.value)}
          />

          <div>
            <label className="mb-2 block font-medium">Rollout</label>

            <input
              type="range"
              min={0}
              max={100}
              value={form.rolloutPercentage}
              onChange={(e) => update("rolloutPercentage", Number(e.target.value))}
              className="w-full"
            />

            <div className="mt-2">{form.rolloutPercentage}%</div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
              />
              Enabled
            </label>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Environments</h3>

            {ENVIRONMENTS.map((env) => (
              <label key={env} className="mb-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.environments.includes(env)}
                  onChange={() => toggleArray("environments", env)}
                />
                {env}
              </label>
            ))}
          </div>

          <div>
            <h3 className="mb-3 font-semibold">User Roles</h3>

            {ROLES.map((role) => (
              <label key={role} className="mb-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.userRoles.includes(role)}
                  onChange={() => toggleArray("userRoles", role)}
                />
                {role}
              </label>
            ))}
          </div>

          <input
            className="rounded-lg border p-3"
            value={form.countries.join(",")}
            placeholder="Countries"
            onChange={(e) =>
              update(
                "countries",
                e.target.value.split(",").map((x) => x.trim()).filter(Boolean)
              )
            }
          />

          <input
            className="rounded-lg border p-3"
            value={form.cities.join(",")}
            placeholder="Cities"
            onChange={(e) =>
              update(
                "cities",
                e.target.value.split(",").map((x) => x.trim()).filter(Boolean)
              )
            }
          />

          <input
            type="datetime-local"
            className="rounded-lg border p-3"
            value={form.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />

          <input
            type="datetime-local"
            className="rounded-lg border p-3"
            value={form.endDate}
            onChange={(e) => update("endDate", e.target.value)}
          />

          <textarea
            rows={3}
            className="rounded-lg border p-3 md:col-span-2"
            value={form.changeReason}
            placeholder="Reason for this update (recommended)"
            onChange={(e) => update("changeReason", e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border px-6 py-3">
            Cancel
          </button>

          <button
            onClick={save}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
