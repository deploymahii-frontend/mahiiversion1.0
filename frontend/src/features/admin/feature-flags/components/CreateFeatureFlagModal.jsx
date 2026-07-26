import { useState } from "react";

const ENVIRONMENTS = ["Development", "Staging", "Production"];
const ROLES = ["ADMIN", "SHOP_OWNER", "CUSTOMER", "DELIVERY_PARTNER"];

export default function CreateFeatureFlagModal({ onClose, onSubmit }) {
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
  });

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleArray = (field, value) => {
    const current = form[field];

    update(
      field,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const submit = () => {
    onSubmit?.(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create Feature Flag</h2>
          <button onClick={onClose} className="rounded-lg px-3 py-2 hover:bg-gray-100">
            ✕
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Feature Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Feature Key</label>
            <input
              value={form.key}
              onChange={(e) => update("key", e.target.value)}
              placeholder="dark_mode"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Rollout Percentage</label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.rolloutPercentage}
              onChange={(e) => update("rolloutPercentage", Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-2 text-sm text-gray-600">{form.rolloutPercentage}%</div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
              />
              Enable Immediately
            </label>
          </div>

          <div>
            <label className="mb-3 block font-medium">Environments</label>
            <div className="space-y-2">
              {ENVIRONMENTS.map((env) => (
                <label key={env} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.environments.includes(env)}
                    onChange={() => toggleArray("environments", env)}
                  />
                  {env}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block font-medium">User Roles</label>
            <div className="space-y-2">
              {ROLES.map((role) => (
                <label key={role} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.userRoles.includes(role)}
                    onChange={() => toggleArray("userRoles", role)}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Countries</label>
            <input
              placeholder="India"
              onChange={(e) =>
                update(
                  "countries",
                  e.target.value.split(",").map((item) => item.trim()).filter(Boolean)
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Cities</label>
            <input
              placeholder="Kolhapur,Pune"
              onChange={(e) =>
                update(
                  "cities",
                  e.target.value.split(",").map((item) => item.trim()).filter(Boolean)
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Start Date</label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">End Date</label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border px-6 py-3">
            Cancel
          </button>
          <button onClick={submit} className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Create Feature Flag
          </button>
        </div>
      </div>
    </div>
  );
}
