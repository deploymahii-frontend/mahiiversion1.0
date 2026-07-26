import { Link } from "react-router-dom";
import { useState } from "react";

import * as adminUserService from "../services/adminUser.service";

export default function UserActionMenu({
  user,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    try {
      setLoading(true);

      await adminUserService.updateUserStatus(
        user._id,
        status
      );

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(role) {
    try {
      setLoading(true);

      await adminUserService.updateUserRole(
        user._id,
        role
      );

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser() {
    const confirmed = window.confirm(
      `Delete "${user.name}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await adminUserService.deleteUser(
        user._id
      );

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">

      <Link
        to={`/admin/users/${user._id}`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        View
      </Link>

      <Link
        to={`/admin/users/${user._id}/edit`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        Edit
      </Link>

      {user.status === "ACTIVE" && (
        <button
          disabled={loading}
          onClick={() =>
            updateStatus("SUSPENDED")
          }
          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
        >
          Suspend
        </button>
      )}

      {user.status === "SUSPENDED" && (
        <button
          disabled={loading}
          onClick={() =>
            updateStatus("ACTIVE")
          }
          className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
        >
          Activate
        </button>
      )}

      {user.role !== "ADMIN" &&
        user.role !== "SUPER_ADMIN" && (
          <button
            disabled={loading}
            onClick={() =>
              changeRole("SHOP_OWNER")
            }
            className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
          >
            Make Shop Owner
          </button>
        )}

      <button
        disabled={loading}
        onClick={deleteUser}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
      >
        Delete
      </button>

    </div>
  );
}
