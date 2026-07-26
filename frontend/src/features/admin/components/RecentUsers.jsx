const demoUsers = [
  {
    _id: "1",
    name: "Rahul Patil",
    email: "rahul@example.com",
    role: "CUSTOMER",
    joinedAt: "20 Jul 2026",
    avatar: "/images/avatar.png",
  },
  {
    _id: "2",
    name: "Sneha More",
    email: "sneha@example.com",
    role: "SHOP_OWNER",
    joinedAt: "19 Jul 2026",
    avatar: "/images/avatar.png",
  },
  {
    _id: "3",
    name: "Admin User",
    email: "admin@mahii.in",
    role: "ADMIN",
    joinedAt: "18 Jul 2026",
    avatar: "/images/avatar.png",
  },
];

function RoleBadge({ role }) {
  const styles = {
    CUSTOMER: "bg-blue-100 text-blue-700",
    SHOP_OWNER: "bg-orange-100 text-orange-700",
    ADMIN: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[role] || "bg-gray-100 text-gray-700"
      }`}
    >
      {role.replace("_", " ")}
    </span>
  );
}

export default function RecentUsers({
  data = demoUsers,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Users
        </h2>

        <button className="text-sm font-medium text-orange-500 hover:underline">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {data.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
          >
            <div className="flex items-center gap-4">

              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

                <p className="text-xs text-gray-400">
                  Joined: {user.joinedAt}
                </p>
              </div>

            </div>

            <RoleBadge role={user.role} />

          </div>
        ))}

      </div>

    </div>
  );
}
