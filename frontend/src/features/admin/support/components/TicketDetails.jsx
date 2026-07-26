import {
  FiUser,
  FiShoppingBag,
  FiClock,
  FiPaperclip,
  FiMessageSquare,
  FiFileText,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiCpu,
} from "react-icons/fi";

export default function TicketDetails({
  loading,
  ticket,
  timeline = [],
  notes = [],
  attachments = [],
  aiSuggestions = [],
  onStatusChange,
  onAddNote,
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
    <div className="grid gap-6 xl:grid-cols-3">

      {/* Left */}

      <div className="xl:col-span-2 space-y-6">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                #{ticket.id}
              </h2>

              <p className="text-gray-500">
                {ticket.subject}
              </p>

            </div>

            <button
              onClick={onRefresh}
              className="rounded-xl border p-3 hover:bg-gray-100"
            >
              <FiRefreshCw />
            </button>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <Info
              icon={FiUser}
              label="Customer"
              value={ticket.customer}
            />

            <Info
              icon={FiShoppingBag}
              label="Merchant"
              value={ticket.merchant}
            />

            <Info
              icon={FiClock}
              label="SLA Remaining"
              value={ticket.sla}
            />

            <Info
              icon={FiAlertTriangle}
              label="Priority"
              value={ticket.priority}
            />

          </div>

          <div className="mt-6">

            <h3 className="font-semibold">
              Description
            </h3>

            <p className="mt-2 text-gray-600">
              {ticket.description}
            </p>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-5 text-xl font-semibold">
            Timeline
          </h3>

          <div className="space-y-5">

            {timeline.map((event) => (

              <div
                key={event.id}
                className="flex gap-4"
              >

                <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-600">
                  <FiCheckCircle />
                </div>

                <div>

                  <div className="font-semibold">
                    {event.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {event.time}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-semibold">
              Internal Notes
            </h3>

            <button
              onClick={onAddNote}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white"
            >
              Add Note
            </button>

          </div>

          <div className="mt-5 space-y-4">

            {notes.map((note) => (

              <div
                key={note.id}
                className="rounded-xl border p-4"
              >

                <div className="font-semibold">
                  {note.author}
                </div>

                <div className="text-sm text-gray-500">
                  {note.time}
                </div>

                <p className="mt-2">
                  {note.message}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="space-y-6">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-4 text-lg font-semibold">
            Attachments
          </h3>

          <div className="space-y-3">

            {attachments.map((file) => (

              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >

                <FiPaperclip />

                {file.name}

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center gap-2">

            <FiCpu />

            <h3 className="text-lg font-semibold">
              AI Suggestions
            </h3>

          </div>

          <div className="space-y-3">

            {aiSuggestions.map((item) => (

              <div
                key={item.id}
                className="rounded-lg border bg-blue-50 p-4"
              >

                {item.message}

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <button
            onClick={onStatusChange}
            className="w-full rounded-xl bg-green-600 py-3 text-white"
          >
            Update Ticket Status
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">

      <Icon className="text-blue-600" />

      <div>

        <div className="text-sm text-gray-500">
          {label}
        </div>

        <div className="font-semibold">
          {value}
        </div>

      </div>

    </div>
  );
}
