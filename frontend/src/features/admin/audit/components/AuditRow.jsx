const ACTION_COLORS = {
  CREATE: "bg-green-100 text-green-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
  APPROVE: "bg-emerald-100 text-emerald-700",
  REJECT: "bg-orange-100 text-orange-700",
  LOGIN: "bg-purple-100 text-purple-700",
  LOGOUT: "bg-gray-100 text-gray-700",
};

export default function AuditRow({
  log,
  onView,
}) {
  function formatAction(action = "") {
    return action.replaceAll("_", " ");
  }

  function getActionColor(action = "") {
    const keyword = Object.keys(ACTION_COLORS).find((key) =>
      action.includes(key)
    );

    return (
      ACTION_COLORS[keyword] ||
      "bg-slate-100 text-slate-700"
    );
  }

  return (
    <tr className="border-t hover:bg-gray-50">

      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(log.createdAt).toLocaleString()}
      </td>

      <td className="px-6 py-4">
        <div className="font-medium">
          {log.performedBy?.name || "System"}
        </div>

        <div className="text-sm text-gray-500">
          {log.performedBy?.email}
        </div>
      </td>

      <td className="px-6 py-4">
        {log.module}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getActionColor(
            log.action
          )}`}
        >
          {formatAction(log.action)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="font-medium">
          {log.target?.name || "-"}
        </div>

        <div className="text-sm text-gray-500">
          {log.target?.type}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {log.ipAddress || "-"}
      </td>

      <td className="px-6 py-4 text-center">
        <button
          onClick={onView}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
        >
          View
        </button>
      </td>

    </tr>
  );
}
