const demoCategories = [
  {
    id: 1,
    name: "Meals",
    revenue: 68500,
    percentage: 42,
  },
  {
    id: 2,
    name: "Beverages",
    revenue: 31200,
    percentage: 19,
  },
  {
    id: 3,
    name: "Snacks",
    revenue: 27150,
    percentage: 17,
  },
  {
    id: 4,
    name: "Desserts",
    revenue: 18200,
    percentage: 11,
  },
  {
    id: 5,
    name: "Others",
    revenue: 9800,
    percentage: 6,
  },
];

export default function CategoryPerformance({
  data = demoCategories,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Category Performance
        </h2>

        <button className="text-sm font-medium text-orange-500 hover:underline">
          View Report
        </button>
      </div>

      <div className="space-y-5">

        {data.map((category) => (
          <div key={category.id}>

            <div className="mb-2 flex items-center justify-between">

              <span className="font-medium">
                {category.name}
              </span>

              <span className="text-sm text-gray-500">
                ₹{category.revenue}
              </span>

            </div>

            <div className="h-2 w-full rounded-full bg-gray-200">

              <div
                className="h-2 rounded-full bg-orange-500"
                style={{
                  width: `${category.percentage}%`,
                }}
              />

            </div>

            <div className="mt-1 text-right text-xs text-gray-500">
              {category.percentage}%
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
