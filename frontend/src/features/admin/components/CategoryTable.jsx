import CategoryRow from "./CategoryRow";

export default function CategoryTable({
  categories = [],
  loading = false,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading categories...
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Icon
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (
              <CategoryRow
                key={category._id}
                category={category}
                onRefresh={onRefresh}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
