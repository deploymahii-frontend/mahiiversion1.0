import {
  FiSmile,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiStar,
  FiTrendingUp,
  FiAlertCircle,
  FiThumbsUp,
} from "react-icons/fi";

export default function CustomerFeedbackPage({
  loading,
  feedback = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  const badge = (score) => {
    if (score >= 4.5) return "bg-green-100 text-green-700";
    if (score >= 3) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiSmile />
            Customer Feedback
          </h2>

          <p className="text-gray-500">
            CSAT, NPS, CES and customer experience analytics.
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
            className="bg-green-600 text-white rounded-lg px-5 py-3"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search feedback..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-center">Channel</th>
              <th className="p-4 text-center">Agent</th>
              <th className="p-4 text-center">Rating</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {feedback.map(item => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">{item.customer}</td>

                <td className="text-center">{item.channel}</td>

                <td className="text-center">{item.agent}</td>

                <td className="text-center">

                  <span className={`px-3 py-1 rounded-full ${badge(item.rating)}`}>
                    ⭐ {item.rating}
                  </span>

                </td>

                <td className="text-center">
                  {item.date}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(item)}
                    className="border rounded p-2"
                  >
                    <FiEye/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiStar size={24}/>
          <h3 className="mt-4 font-semibold">CSAT Score</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Net Promoter Score</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiThumbsUp size={24}/>
          <h3 className="mt-4 font-semibold">Customer Effort Score</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertCircle size={24}/>
          <h3 className="mt-4 font-semibold">Negative Feedback Alerts</h3>
        </div>

      </div>

    </div>
  );

}
