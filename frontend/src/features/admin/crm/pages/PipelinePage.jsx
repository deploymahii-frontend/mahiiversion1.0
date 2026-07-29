import {
  FiTarget,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

const stages = [
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
];

export default function PipelinePage({
  loading,
  pipeline = {},
  onRefresh,
  onExport,
  onCardClick,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTarget />
            Sales Pipeline
          </h2>

          <p className="text-gray-500">
            Track opportunities across every stage of the sales lifecycle.
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

        </div>

      </div>

      {/* Kanban Board */}

      <div className="grid gap-6 xl:grid-cols-5">

        {stages.map((stage) => (

          <div
            key={stage}
            className="rounded-2xl bg-gray-50 p-4"
          >

            <div className="mb-4">

              <h3 className="font-bold text-lg">
                {stage}
              </h3>

              <p className="text-sm text-gray-500">
                {(pipeline[stage] || []).length} Deals
              </p>

            </div>

            <div className="space-y-4">

              {(pipeline[stage] || []).map((deal) => (

                <div
                  key={deal.id}
                  onClick={() => onCardClick?.(deal)}
                  className="cursor-pointer rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition"
                >

                  <h4 className="font-semibold">
                    {deal.name}
                  </h4>

                  <p className="mt-2 text-sm text-gray-500">
                    {deal.account}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">

                    <div>
                      <FiDollarSign className="inline mr-2" />
                      {deal.value}
                    </div>

                    <div>
                      <FiUser className="inline mr-2" />
                      {deal.owner}
                    </div>

                    <div>
                      <FiCalendar className="inline mr-2" />
                      {deal.expectedClose}
                    </div>

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
