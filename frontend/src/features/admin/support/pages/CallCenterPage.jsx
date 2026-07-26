import {
  FiPhone,
  FiPhoneCall,
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiUser,
  FiClock,
  FiPlay,
  FiMic,
} from "react-icons/fi";

export default function CallCenterPage({
  loading,
  calls = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onViewRecording,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const directionIcon = (type) => {
    switch (type) {
      case "Inbound":
        return <FiPhoneIncoming className="text-green-600" />;
      case "Outbound":
        return <FiPhoneOutgoing className="text-blue-600" />;
      default:
        return <FiPhone />;
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Missed":
        return "bg-red-100 text-red-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Queued":
        return "bg-yellow-100 text-yellow-700";
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
            <FiPhoneCall />
            Call Center
          </h2>

          <p className="text-gray-500">
            Manage inbound, outbound calls, recordings, queues and IVR.
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
            <FiDownload className="mr-2 inline"/>
            Export
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
            placeholder="Search customer or phone..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Call Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-center">Direction</th>
              <th className="p-4 text-center">Agent</th>
              <th className="p-4 text-center">Duration</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Recording</th>
            </tr>

          </thead>

          <tbody>

            {calls.map((call)=>(

              <tr key={call.id} className="border-t">

                <td className="p-4">
                  {call.customer}
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center">
                    {directionIcon(call.direction)}
                  </div>
                </td>

                <td className="p-4 text-center">
                  <FiUser className="mr-2 inline"/>
                  {call.agent}
                </td>

                <td className="p-4 text-center">
                  <FiClock className="mr-2 inline"/>
                  {call.duration}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(call.status)}`}>
                    {call.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={()=>onViewRecording?.(call)}
                    className="rounded border p-2"
                  >
                    <FiPlay/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPhoneIncoming className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">Inbound Calls</h3>
          <p className="mt-2 text-gray-500">
            Incoming customer calls.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPhoneOutgoing className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Outbound Calls</h3>
          <p className="mt-2 text-gray-500">
            Agent initiated calls.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMic className="mb-3 text-red-600" size={24}/>
          <h3 className="font-semibold">Call Recording</h3>
          <p className="mt-2 text-gray-500">
            Secure recording archive.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPhoneCall className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Queue Monitoring</h3>
          <p className="mt-2 text-gray-500">
            Live waiting queue analytics.
          </p>
        </div>

      </div>

    </div>
  );

}
