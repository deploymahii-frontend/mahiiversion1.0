import { useMemo, useState } from "react";

const STATUS_STYLES = {
  SUCCESS: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  SUSPICIOUS: "bg-yellow-100 text-yellow-800",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function LoginActivity({
  loading,
  data = {},
}) {
  const [search, setSearch] = useState("");

  const activities = data.loginActivity || [];

  const filteredActivities = useMemo(() => {
    const query = search.toLowerCase();

    return activities.filter((item) => {
      return (
        item.user.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.ip.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    });
  }, [activities, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading login activity...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Login Activity
          </h2>

          <p className="text-gray-500">
            Recent authentication events.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search user, email, IP or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 md:w-80"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredActivities.map((activity) => (

              <tr
                key={activity.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {activity.user}
                </td>

                <td className="px-4 py-4">
                  {activity.email}
                </td>

                <td className="px-4 py-4">
                  {activity.ip}
                </td>

                <td className="px-4 py-4">
                  {activity.location}
                </td>

                <td className="px-4 py-4">
                  {activity.device}
                </td>

                <td className="px-4 py-4">
                  {new Date(activity.timestamp).toLocaleString()}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge
                    status={activity.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
