import {
  FiBookOpen,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEdit,
  FiEye,
  FiFolder,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function KnowledgeBasePage({
  loading,
  articles = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onEdit,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusBadge = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Review":
        return "bg-blue-100 text-blue-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
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
            <FiBookOpen />
            Knowledge Base
          </h2>

          <p className="text-gray-500">
            Centralized enterprise knowledge repository for agents and AI.
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
            New Article
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Articles */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Author</th>
              <th className="p-4 text-center">Version</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {articles.map((article)=>(

              <tr
                key={article.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {article.title}
                </td>

                <td className="p-4 text-center">
                  <FiFolder className="mr-2 inline"/>
                  {article.category}
                </td>

                <td className="p-4 text-center">
                  {article.author}
                </td>

                <td className="p-4 text-center">
                  {article.version}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(article.status)}`}>
                    {article.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(article)}
                      className="rounded border p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onEdit?.(article)}
                      className="rounded border p-2"
                    >
                      <FiEdit/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBookOpen className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Knowledge Articles</h3>
          <p className="mt-2 text-gray-500">
            Central documentation library.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFolder className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Categories</h3>
          <p className="mt-2 text-gray-500">
            Organized content collections.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">Approval Workflow</h3>
          <p className="mt-2 text-gray-500">
            Review and publishing process.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-orange-600" size={24}/>
          <h3 className="font-semibold">Version History</h3>
          <p className="mt-2 text-gray-500">
            Complete article revision tracking.
          </p>
        </div>

      </div>

    </div>
  );

}
