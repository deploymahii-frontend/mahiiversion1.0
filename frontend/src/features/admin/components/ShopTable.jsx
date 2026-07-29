import ShopRow from "./ShopRow";

export default function ShopTable({
  shops = [],
  loading = false,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading shops...
      </div>
    );
  }

  if (!shops.length) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        No shops found.
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
                Shop
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Owner
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                City
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {shops.map((shop) => (
              <ShopRow
                key={shop._id}
                shop={shop}
                onRefresh={onRefresh}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
