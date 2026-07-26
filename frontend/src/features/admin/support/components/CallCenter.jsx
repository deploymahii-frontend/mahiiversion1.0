import {
  FiPhone,
  FiPhoneCall,
  FiMic,
  FiUsers,
  FiCalendar,
  FiRefreshCw,
  FiArrowRightCircle,
  FiFileText,
} from "react-icons/fi";

export default function CallCenter({
  loading,
  activeCalls = [],
  callbacks = [],
  agents = [],
  onTransferCall,
  onScheduleCallback,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Call Center
            </h2>

            <p className="text-gray-500">
              Monitor voice support operations in real time.
            </p>

          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>

        </div>

      </div>

      {/* Active Calls */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">

          <FiPhoneCall />

          <h3 className="text-xl font-semibold">
            Active Calls
          </h3>

        </div>

        <div className="space-y-4">

          {activeCalls.map((call) => (

            <div
              key={call.id}
              className="rounded-xl border p-5"
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <strong>{call.customer}</strong>

                  <div className="text-sm text-gray-500">
                    {call.phone}
                  </div>

                </div>

                <div>{call.duration}</div>

                <div>{call.agent}</div>

                <button
                  onClick={() => onTransferCall?.(call)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  <FiArrowRightCircle />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Agents */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">

          <FiUsers />

          <h3 className="text-xl font-semibold">
            Agent Status
          </h3>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {agents.map((agent) => (

            <div
              key={agent.id}
              className="rounded-xl border p-4"
            >

              <strong>{agent.name}</strong>

              <div className="mt-2 text-sm text-gray-500">
                {agent.status}
              </div>

              <div className="mt-2">
                Active Calls: {agent.calls}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Callback Queue */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-2">

          <FiCalendar />

          <h3 className="text-xl font-semibold">
            Callback Queue
          </h3>

        </div>

        <div className="space-y-4">

          {callbacks.map((item) => (

            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between rounded-xl border p-4"
            >

              <div>

                <strong>{item.customer}</strong>

                <div className="text-sm text-gray-500">
                  {item.phone}
                </div>

              </div>

              <div>{item.time}</div>

              <button
                onClick={() => onScheduleCallback?.(item)}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Schedule
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Recording & Notes */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <FiMic />

            <h3 className="font-semibold">
              Recording Status
            </h3>

          </div>

          <p className="text-gray-600">
            All active calls are being recorded and stored according to
            retention policies.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <FiFileText />

            <h3 className="font-semibold">
              Call Notes
            </h3>

          </div>

          <p className="text-gray-600">
            Agents can capture conversation summaries, commitments, and
            follow-up actions linked to the customer profile and support
            ticket.
          </p>

        </div>

      </div>

    </div>
  );
}
// Placeholder for CallCenter component
export default function CallCenter() {
  return null;
}
