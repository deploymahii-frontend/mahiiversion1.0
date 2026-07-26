import { useEffect, useState } from "react";

export default function AssignRoleModal({
  open,
  user,
  roles = [],
  loading = false,
  onClose,
  onSave,
}) {
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  useEffect(() => {
    if (user) {
      setSelectedRoleIds(
        user.roles?.map((role) => role._id || role) || []
      );
    }
  }, [user]);

  if (!open || !user) return null;

  function toggleRole(roleId) {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave?.({
      userId: user._id,
      roleIds: selectedRoleIds,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Assign Roles
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <p>
            <strong>User:</strong> {user.name}
          </p>

          <p className="text-gray-600">
            {user.email}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="space-y-3">

            {roles.map((role) => (

              <label
                key={role._id}
                className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
              >
                <div>
                  <p className="font-semibold">
                    {role.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {role.description}
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={selectedRoleIds.includes(role._id)}
                  onChange={() =>
                    toggleRole(role._id)
                  }
                />

              </label>

            ))}

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Roles"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
