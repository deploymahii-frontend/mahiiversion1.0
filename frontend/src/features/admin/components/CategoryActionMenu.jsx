import { Link } from "react-router-dom";
import { useState } from "react";

import * as adminCategoryService from "../services/adminCategory.service";

export default function CategoryActionMenu({
  category,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    try {
      setLoading(true);

      await adminCategoryService.updateCategoryStatus(
        category._id,
        status
      );

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory() {
    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await adminCategoryService.deleteCategory(
        category._id
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
        to={`/admin/categories/${category._id}`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        View
      </Link>

      <Link
        to={`/admin/categories/${category._id}/edit`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        Edit
      </Link>

      {category.status === "ACTIVE" && (
        <button
          disabled={loading}
          onClick={() =>
            updateStatus("INACTIVE")
          }
          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600 disabled:opacity-50"
        >
          Deactivate
        </button>
      )}

      {category.status === "INACTIVE" && (
        <button
          disabled={loading}
          onClick={() =>
            updateStatus("ACTIVE")
          }
          className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600 disabled:opacity-50"
        >
          Activate
        </button>
      )}

      <button
        disabled={loading}
        onClick={deleteCategory}
        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
      >
        Delete
      </button>

    </div>
  );
}
