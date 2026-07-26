import {
  FiCheckSquare,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiUser,
  FiCalendar,
  FiFlag,
} from "react-icons/fi";

export default function TasksPage({
  loading,
  tasks = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
  onComplete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const priorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCheckSquare />
            Tasks
          </h2>

          <p className="text-gray-500">
            Assign, monitor and complete CRM-related tasks.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Task
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search task..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Task Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Task</th>
              <th className="p-4 text-left">Assigned To</th>
              <th className="p-4 text-left">Due Date</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map((task) => (

              <tr
                key={task.id}
                className="border-t"
              >

                <td className="p-4 font-semibold">
                  {task.title}
                </td>

                <td className="p-4">
                  <FiUser className="inline mr-2" />
                  {task.assignedTo}
                </td>

                <td className="p-4">
                  <FiCalendar className="inline mr-2" />
                  {task.dueDate}
                </td>

                <td className="p-4">

                  <span className={`rounded-full px-3 py-1 text-sm ${priorityColor(task.priority)}`}>
                    <FiFlag className="inline mr-1" />
                    {task.priority}
                  </span>

                </td>

                <td className="p-4">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(task.status)}`}>
                    {task.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(task)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(task)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    {task.status !== "Completed" && (
                      <button
                        onClick={() => onComplete?.(task)}
                        className="rounded border p-2"
                      >
                        <FiCheckSquare />
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
