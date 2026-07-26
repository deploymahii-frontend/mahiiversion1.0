import { useMemo, useState } from "react";

function TwoFactorBadge({ enabled }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        enabled
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {enabled ? "ENABLED" : "DISABLED"}
    </span>
  );
}

export default function TwoFactorManagement({
  loading,
  data = {},
  onSendReminder,
  onResetTwoFactor,
}) {
  const [search, setSearch] = useState("");

  const users = data.twoFactorUsers || [];

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading 2FA management...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Two-Factor Authentication
          </h2>

          <p className="text-gray-500">
            Monitor and manage 2FA enrollment.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 md:w-80"
        />

      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.summary?.totalUsers ?? "--"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            2FA Enabled
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.summary?.enabledUsers ?? "--"}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Adoption Rate
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.summary?.adoptionRate ?? "--"}%
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-medium">
                  {user.name}
                </td>

                <td className="px-4 py-4">
                  {user.email}
                </td>

                <td className="px-4 py-4">
                  {user.method || "-"}
                </td>

                <td className="px-4 py-4">
                  <TwoFactorBadge enabled={user.enabled} />
                </td>

                <td className="px-4 py-4 text-right">

                  <div className="flex justify-end gap-2">

                    {!user.enabled && (
                      <button
                        onClick={() =>
                          onSendReminder?.(user.id)
                        }
                        className="rounded-lg border px-3 py-2 hover:bg-gray-100"
                      >
                        Send Reminder
                      </button>
                    )}

                    {user.enabled && (
                      <button
                        onClick={() =>
                          onResetTwoFactor?.(user.id)
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                      >
                        Reset 2FA
                      </button>
                    )}

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
