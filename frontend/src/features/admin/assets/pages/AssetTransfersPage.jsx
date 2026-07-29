import {
  FiRepeat,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiUser,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

export default function AssetTransfersPage({
  loading,
  transfers = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateTransfer,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiRepeat />
            Asset Transfers
          </h2>

          <p className="text-gray-500">
            Track ownership, assignment, and movement of enterprise assets.
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
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateTransfer}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Transfer
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search transfers..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Transfer Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Asset</th>
              <th className="text-center">From</th>
              <th className="text-center">To</th>
              <th className="text-center">Transfer Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {transfers.map((transfer) => (

              <tr key={transfer.id} className="border-t">

                <td className="p-4 font-medium">
                  {transfer.asset}
                </td>

                <td className="text-center">
                  <FiMapPin className="inline mr-1"/>
                  {transfer.from}
                </td>

                <td className="text-center">
                  <FiUser className="inline mr-1"/>
                  {transfer.to}
                </td>

                <td className="text-center">
                  {transfer.date}
                </td>

                <td className="text-center">
                  {transfer.status}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(transfer)}
                    className="border rounded p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiRepeat size={24}/>
          <h3 className="mt-4 font-semibold">Transfers</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUser size={24}/>
          <h3 className="mt-4 font-semibold">Assignments</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMapPin size={24}/>
          <h3 className="mt-4 font-semibold">Location History</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Approvals</h3>
        </div>

      </div>

    </div>
  );
}
