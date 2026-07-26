import { Link } from "react-router-dom";
import { useState } from "react";

import * as roleService from "../services/role.service";

export default function RoleRow({
  role,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);

  async function deleteRole() {
    if (role.isSystemRole) {
      alert("System roles cannot be deleted.");
      return;
    }

    const confirmed = window.confirm(
      `Delete role "${role.name}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await roleService.deleteRole(role._id);

      onRefresh?.();
    } catch (error) {
      console.error(error);
      alert("Unable to delete role.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <tr className="border-t">

      <td className="px-6 py-4">
        <div className="font-semibold">
          {role.name}
        </div>

        {role.isSystemRole && (
          <span className="mt-1 inline-block rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
            System Role
          </span>
        )}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {role.description}
      </td>

      <td className="px-6 py-4 text-center">
        {role.permissions?.length || 0}
      </td>

      <td className="px-6 py-4 text-center">
        {role.userCount || 0}
      </td>

      <td className="px-6 py-4 text-center">
        {new Date(role.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">

          <Link
            to={`/admin/roles/${role._id}`}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
          >
            View
          </Link>

          <Link
            to={`/admin/roles/${role._id}/edit`}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
          >
            Edit
          </Link>

          {!role.isSystemRole && (
            <button
              disabled={loading}
              onClick={deleteRole}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          )}

        </div>
      </td>

    </tr>
  );
}
