import {
  FiFolder,
  FiFileText,
  FiUpload,
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiEye,
  FiClock,
  FiLock,
} from "react-icons/fi";

export default function ProjectDocumentsPage({
  loading,
  documents = [],
  search = "",
  onSearch,
  onRefresh,
  onUpload,
  onDownload,
  onView,
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

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiFolder />
            Project Documents
          </h2>

          <p className="text-gray-500">
            Centralized project document repository with version control.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onUpload}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiUpload className="inline mr-2"/>
            Upload
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search project documents..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Documents */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Document</th>
              <th className="text-center">Version</th>
              <th className="text-center">Owner</th>
              <th className="text-center">Modified</th>
              <th className="text-center">Security</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {documents.map(doc => (

              <tr key={doc.id} className="border-t">

                <td className="p-4 font-medium">
                  <FiFileText className="inline mr-2"/>
                  {doc.name}
                </td>

                <td className="text-center">
                  {doc.version}
                </td>

                <td className="text-center">
                  {doc.owner}
                </td>

                <td className="text-center">
                  <FiClock className="inline mr-1"/>
                  {doc.modified}
                </td>

                <td className="text-center">
                  <FiLock className="inline mr-1"/>
                  {doc.security}
                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(doc)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onDownload?.(doc)}
                      className="border rounded p-2"
                    >
                      <FiDownload/>
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
