import { useMemo, useState } from "react";

function StatusBadge({ online }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        online
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {online ? "ONLINE" : "OFFLINE"}
    </span>
  );
}

export default function ActiveSessions({
  loading,
  data = {},
  onTerminateSession,
  onTerminateAllSessions,
}) {
  const [search, setSearch] = useState("");

  const sessions = data.sessions || [];

  const filteredSessions = useMemo(() => {
    const query = search.toLowerCase();

    return sessions.filter((session) => {
      return (
        session.user.toLowerCase().includes(query) ||
        session.email.toLowerCase().includes(query) ||
        session.ip.toLowerCase().includes(query)
      );
    });
  }, [sessions, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading active sessions...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Active Sessions
          </h2>

          <p className="text-gray-500">
            Monitor and manage logged-in users.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search user, email or IP..."
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
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">Last Activity</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredSessions.map((session) => (

              <tr
                key={session.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4">
                  <div className="font-medium">
                    {session.user}
                  </div>

                  <div className="text-sm text-gray-500">
                    {session.email}
                  </div>
                </td>

                <td className="px-4 py-4">
                  {session.device}
                </td>

                <td className="px-4 py-4">
                  {session.location}
                </td>

                <td className="px-4 py-4">
                  {session.ip}
                </td>

                <td className="px-4 py-4">
                  {new Date(session.lastActivity).toLocaleString()}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge online={session.online} />
                </td>

                <td className="px-4 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        onTerminateSession?.(session.id)
                      }
                      className="rounded-lg border px-3 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                    <button
                      onClick={() =>
                        onTerminateAllSessions?.(session.userId)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Logout All
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
