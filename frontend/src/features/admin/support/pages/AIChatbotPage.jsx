import {
  FiCpu,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiPlay,
  FiMessageCircle,
  FiBookOpen,
  FiUser,
  FiTrendingUp,
} from "react-icons/fi";

export default function AIChatbotPage({
  loading,
  conversations = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onOpenConversation,
  onTrainModel,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const confidenceBadge = (score) => {
    if (score >= 90) return "bg-green-100 text-green-700";
    if (score >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCpu />
            AI Chatbot
          </h2>

          <p className="text-gray-500">
            Manage AI conversations, intent recognition, and human handoff.
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

          <button
            onClick={onTrainModel}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlay className="mr-2 inline"/>
            Train AI
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
            placeholder="Search conversation..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Conversation Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Intent</th>
              <th className="p-4 text-center">Confidence</th>
              <th className="p-4 text-center">Knowledge Source</th>
              <th className="p-4 text-center">Escalated</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {conversations.map((chat)=>(

              <tr key={chat.id} className="border-t">

                <td className="p-4">
                  {chat.customer}
                </td>

                <td className="p-4 font-medium">
                  {chat.intent}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${confidenceBadge(chat.confidence)}`}>
                    {chat.confidence}%
                  </span>

                </td>

                <td className="p-4 text-center">
                  <FiBookOpen className="mr-2 inline"/>
                  {chat.source}
                </td>

                <td className="p-4 text-center">
                  {chat.escalated ? "Yes" : "No"}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={()=>onOpenConversation?.(chat)}
                    className="rounded border p-2"
                  >
                    <FiMessageCircle/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* AI Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCpu className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Intent Detection</h3>
          <p className="mt-2 text-gray-500">
            AI classifies customer requests.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBookOpen className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Knowledge Retrieval</h3>
          <p className="mt-2 text-gray-500">
            Answers powered by enterprise knowledge.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUser className="mb-3 text-orange-600" size={24}/>
          <h3 className="font-semibold">Human Handoff</h3>
          <p className="mt-2 text-gray-500">
            Escalate complex conversations.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">AI Performance</h3>
          <p className="mt-2 text-gray-500">
            Accuracy and automation metrics.
          </p>
        </div>

      </div>

    </div>
  );

}
