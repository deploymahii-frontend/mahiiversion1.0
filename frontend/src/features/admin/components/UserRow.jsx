import { Link } from "react-router-dom";

import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActionMenu from "./UserActionMenu";

export default function UserRow({
  user,
  onRefresh,
}) {
  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* User */}

      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <img
            src={
              user.avatar ||
              "/images/avatar.png"
            }
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>

            <Link
              to={`/admin/users/${user._id}`}
              className="font-semibold hover:text-orange-500"
            >
              {user.name}
            </Link>

            <p className="text-sm text-gray-500">
              Joined:{" "}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </td>

      {/* Email */}

      <td className="px-6 py-4">
        {user.email}
      </td>

      {/* Phone */}

      <td className="px-6 py-4">
        {user.phone || "-"}
      </td>

      {/* Role */}

      <td className="px-6 py-4">
        <UserRoleBadge
          role={user.role}
        />
      </td>

      {/* Status */}

      <td className="px-6 py-4">
        <UserStatusBadge
          status={user.status}
        />
      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <UserActionMenu
          user={user}
          onUpdated={onRefresh}
        />

      </td>

    </tr>
  );
}
