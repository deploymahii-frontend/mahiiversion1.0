import { Link } from "react-router-dom";
import CategoryActionMenu from "./CategoryActionMenu";

export default function CategoryRow({
  category,
  onRefresh,
}) {
  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Icon */}

      <td className="px-6 py-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">

          {category.icon || "📂"}

        </div>

      </td>

      {/* Category */}

      <td className="px-6 py-4">

        <Link
          to={`/admin/categories/${category._id}`}
          className="font-semibold hover:text-orange-500"
        >
          {category.name}
        </Link>

      </td>

      {/* Slug */}

      <td className="px-6 py-4">

        <code className="rounded bg-gray-100 px-2 py-1 text-sm">
          {category.slug}
        </code>

      </td>

      {/* Description */}

      <td className="max-w-xs px-6 py-4">

        <p className="truncate text-gray-600">
          {category.description || "-"}
        </p>

      </td>

      {/* Status */}

      <td className="px-6 py-4">

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            category.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {category.status}
        </span>

      </td>

      {/* Created */}

      <td className="px-6 py-4 text-sm text-gray-500">

        {new Date(category.createdAt).toLocaleDateString()}

      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <CategoryActionMenu
          category={category}
          onUpdated={onRefresh}
        />

      </td>

    </tr>
  );
}
