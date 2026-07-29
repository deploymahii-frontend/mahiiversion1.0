import {
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
  FiUsers,
  FiCheckSquare,
  FiClock,
} from "react-icons/fi";

export default function CalendarPage({
  loading,
  currentMonth = "July 2026",
  events = [],
  onPrevious,
  onNext,
  onRefresh,
  onExport,
  onCreateEvent,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const getEventIcon = (type) => {
    switch (type) {
      case "Meeting":
        return <FiUsers className="text-purple-600" />;
      case "Call":
        return <FiPhone className="text-blue-600" />;
      case "Task":
        return <FiCheckSquare className="text-green-600" />;
      default:
        return <FiClock className="text-orange-600" />;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCalendar />
            CRM Calendar
          </h2>

          <p className="text-gray-500">
            Manage meetings, calls, follow-ups and customer schedules.
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
            onClick={onCreateEvent}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Event
          </button>

        </div>

      </div>

      {/* Month Navigation */}

      <div className="rounded-2xl bg-white shadow-sm p-4 flex justify-between items-center">

        <button
          onClick={onPrevious}
          className="rounded-lg border p-3"
        >
          <FiChevronLeft />
        </button>

        <h3 className="text-xl font-bold">
          {currentMonth}
        </h3>

        <button
          onClick={onNext}
          className="rounded-lg border p-3"
        >
          <FiChevronRight />
        </button>

      </div>

      {/* Calendar Placeholder */}

      <div className="rounded-2xl bg-white shadow-sm p-8">

        <div className="h-[500px] rounded-xl border border-dashed flex items-center justify-center text-gray-400">
          Monthly / Weekly / Daily Calendar View
        </div>

      </div>

      {/* Upcoming Events */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="mb-6 text-lg font-bold">
          Upcoming Events
        </h3>

        <div className="space-y-4">

          {events.map((event) => (

            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-lg bg-gray-100 p-3">
                  {getEventIcon(event.type)}
                </div>

                <div>

                  <h4 className="font-semibold">
                    {event.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {event.customer}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <div className="font-medium">
                  {event.date}
                </div>

                <div className="text-sm text-gray-500">
                  {event.time}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
