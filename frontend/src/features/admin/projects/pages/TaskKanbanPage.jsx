import {
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiUser,
  FiCalendar,
  FiFlag,
  FiPaperclip,
  FiMessageSquare,
  FiMoreVertical,
} from "react-icons/fi";

export default function TaskKanbanPage({
  loading,
  columns = [],
  onRefresh,
  onExport,
  onCreateTask,
  onOpenTask,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Tasks & Kanban
          </h2>

          <p className="text-gray-500">
            Manage project execution with enterprise Kanban boards.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw/>
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateTask}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Task
          </button>

        </div>

      </div>

      {/* Kanban */}

      <div className="grid grid-cols-4 gap-6">

        {columns.map((column)=>(

          <div
            key={column.id}
            className="rounded-2xl bg-gray-50 p-4"
          >

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-semibold">
                {column.title}
              </h3>

              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm">
                {column.tasks.length}
              </span>

            </div>

            <div className="space-y-4">

              {column.tasks.map(task=>(

                <div
                  key={task.id}
                  onClick={()=>onOpenTask?.(task)}
                  className="cursor-pointer rounded-xl bg-white p-4 shadow-sm hover:shadow-md"
                >

                  <div className="flex justify-between">

                    <h4 className="font-semibold">
                      {task.title}
                    </h4>

                    <FiMoreVertical/>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {task.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">

                    <span>
                      <FiUser className="inline mr-1"/>
                      {task.assignee}
                    </span>

                    <span>
                      <FiCalendar className="inline mr-1"/>
                      {task.dueDate}
                    </span>

                  </div>

                  <div className="mt-4 flex justify-between text-gray-500">

                    <span>
                      <FiPaperclip className="inline mr-1"/>
                      {task.attachments}
                    </span>

                    <span>
                      <FiMessageSquare className="inline mr-1"/>
                      {task.comments}
                    </span>

                    <span>
                      <FiFlag className="inline mr-1"/>
                      {task.priority}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
