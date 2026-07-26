import { useEffect, useState } from "react";

const PERMISSION_GROUPS = {
  Users: [
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
  ],
  Shops: [
    "shops.read",
    "shops.create",
    "shops.update",
    "shops.delete",
    "shops.approve",
  ],
  Orders: [
    "orders.read",
    "orders.update",
    "orders.cancel",
    "orders.refund",
  ],
  Products: [
    "products.read",
    "products.create",
    "products.update",
    "products.delete",
  ],
  Categories: [
    "categories.read",
    "categories.create",
    "categories.update",
    "categories.delete",
  ],
  Reports: [
    "reports.view",
    "reports.export",
  ],
  Payments: [
    "payments.read",
    "payments.update",
    "payments.payout",
  ],
  Settings: [
    "settings.read",
    "settings.update",
  ],
};

export default function RoleForm({
  initialValues = {},
  loading = false,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    setForm({
      name: initialValues.name || "",
      description: initialValues.description || "",
      permissions: initialValues.permissions || [],
    });
  }, [initialValues]);

  function togglePermission(permission) {
    setForm((prev) => {
      const exists = prev.permissions.includes(permission);

      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(
              (item) => item !== permission
            )
          : [...prev.permissions, permission],
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-semibold">
        {initialValues._id ? "Edit Role" : "Create Role"}
      </h2>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Role Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Permissions
          </h3>

          <div className="space-y-6">

            {Object.entries(PERMISSION_GROUPS).map(
              ([group, permissions]) => (
                <div
                  key={group}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <h4 className="mb-4 font-semibold">
                    {group}
                  </h4>

                  <div className="grid gap-3 md:grid-cols-2">

                    {permissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={form.permissions.includes(
                            permission
                          )}
                          onChange={() =>
                            togglePermission(permission)
                          }
                        />

                        <span>{permission}</span>
                      </label>
                    ))}

                  </div>
                </div>
              )
            )}

          </div>
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialValues._id
          ? "Update Role"
          : "Create Role"}
      </button>
    </form>
  );
}
