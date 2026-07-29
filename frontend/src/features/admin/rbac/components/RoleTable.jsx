import RoleRow from "./RoleRow";

export default function RoleTable({
  roles = [],
  loading = false,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading roles...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-50">
            <tr>

              <th className="px-6 py-4 text-left font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Description
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Permissions
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Users
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <RoleRow
                  key={role._id}
                  role={role}
                  onRefresh={onRefresh}
                />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
