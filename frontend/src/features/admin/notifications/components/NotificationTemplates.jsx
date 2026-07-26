import {
  FiFileText,
  FiEye,
  FiEdit2,
  FiCopy,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  ARCHIVED: "bg-gray-100 text-gray-700",
};

export default function NotificationTemplates({
  loading,
  templates = [],
  onCreate,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <FiFileText size={24} />

          <div>
            <h2 className="text-2xl font-bold">
              Notification Templates
            </h2>

            <p className="text-gray-500">
              Reusable templates for all communication channels.
            </p>
          </div>
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Template
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">Name</th>
              <th>Channel</th>
              <th>Language</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {templates.map((template) => (

              <tr
                key={template.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4 font-medium">
                  {template.name}
                </td>

                <td>{template.channel}</td>

                <td>{template.language}</td>

                <td>{template.category}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusStyles[template.status]
                    }`}
                  >
                    {template.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        onPreview?.(template)
                      }
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="Preview"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() =>
                        onEdit?.(template)
                      }
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() =>
                        onDuplicate?.(template)
                      }
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                      title="Duplicate"
                    >
                      <FiCopy />
                    </button>

                    <button
                      onClick={() =>
                        onDelete?.(template)
                      }
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Delete"
                    >
                      <FiTrash2 />
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
