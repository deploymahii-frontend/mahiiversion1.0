const demoShops = [
  {
    _id: "1",
    name: "Shree Mess",
    owner: "Rahul Patil",
    joinedAt: "20 Jul 2026",
    status: "APPROVED",
    logo: "/images/shop-placeholder.png",
  },
  {
    _id: "2",
    name: "Campus Cafe",
    owner: "Sneha More",
    joinedAt: "19 Jul 2026",
    status: "PENDING",
    logo: "/images/shop-placeholder.png",
  },
  {
    _id: "3",
    name: "Food Corner",
    owner: "Amit Jadhav",
    joinedAt: "18 Jul 2026",
    status: "REJECTED",
    logo: "/images/shop-placeholder.png",
  },
];

function StatusBadge({ status }) {
  const styles = {
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function RecentShops({
  data = demoShops,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Shops
        </h2>

        <button className="text-sm font-medium text-orange-500 hover:underline">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {data.map((shop) => (
          <div
            key={shop._id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
          >
            <div className="flex items-center gap-4">

              <img
                src={shop.logo}
                alt={shop.name}
                className="h-12 w-12 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {shop.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Owner: {shop.owner}
                </p>

                <p className="text-xs text-gray-400">
                  Joined: {shop.joinedAt}
                </p>
              </div>

            </div>

            <StatusBadge status={shop.status} />

          </div>
        ))}

      </div>

    </div>
  );
}
