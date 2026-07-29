import React from "react";

export default function PermissionMatrix({
  roles = [],
  permissions = [],
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead className="bg-gray-50">

            <tr>

              <th className="sticky left-0 bg-gray-50 px-6 py-4 text-left font-semibold">
                Permission
              </th>

              {roles.map((role) => (
                <th
                  key={role._id}
                  className="px-5 py-4 text-center font-semibold whitespace-nowrap"
                >
                  {role.name}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {permissions.map((permission) => (

              <tr
                key={permission}
                className="border-t"
              >

                <td className="sticky left-0 bg-white px-6 py-4 font-medium">
                  {permission}
                </td>

                {roles.map((role) => {

                  const allowed =
                    role.permissions.includes(permission);

                  return (
                    <td
                      key={role._id}
                      className="px-5 py-4 text-center"
                    >
                      {allowed ? (
                        <span className="text-green-600 text-lg">
                          ✔
                        </span>
                      ) : (
                        <span className="text-red-500 text-lg">
                          ✖
                        </span>
                      )}
                    </td>
                  );
                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}
