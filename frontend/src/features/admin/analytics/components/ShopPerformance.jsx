const TABLE_HEADERS = [
  "Shop",
  "Category",
  "City",
  "Orders",
  "Revenue",
  "Rating",
  "Growth",
];

function GrowthBadge({ value = 0 }) {
  const positive = value >= 0;

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        positive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {positive ? "▲" : "▼"} {Math.abs(value)}%
    </span>
  );
}

export default function ShopPerformance({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading shop performance...
      </div>
    );
  }

  const shops = data.topShops || [];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Shop Performance
        </h2>

        <p className="text-gray-500">
          Top-performing merchants across the marketplace.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead>

            <tr className="border-b bg-gray-50">

              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {shops.map((shop) => (

              <tr
                key={shop.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4 font-medium">
                  {shop.name}
                </td>

                <td className="px-4 py-4">
                  {shop.category}
                </td>

                <td className="px-4 py-4">
                  {shop.city}
                </td>

                <td className="px-4 py-4">
                  {shop.orders}
                </td>

                <td className="px-4 py-4 font-semibold">
                  ₹{shop.revenue}
                </td>

                <td className="px-4 py-4">
                  ⭐ {shop.rating}
                </td>

                <td className="px-4 py-4">
                  <GrowthBadge value={shop.growth} />
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Revenue by Category
          </h3>

          <div className="flex h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

            <div className="text-center">
              <div className="text-5xl">📊</div>
              <p className="mt-3">
                Category Revenue Chart
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Shop Growth Trend
          </h3>

          <div className="flex h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

            <div className="text-center">
              <div className="text-5xl">📈</div>
              <p className="mt-3">
                Shop Growth Chart
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
