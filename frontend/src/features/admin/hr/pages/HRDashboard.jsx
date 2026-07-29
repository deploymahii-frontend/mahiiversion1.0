import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiUserPlus,
  FiGift,
  FiRefreshCw,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

import HRStatCard from "../components/HRStatCard";

export default function HRDashboard({
  loading,
  dashboard = {},
  onRefresh,
  onExport,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Employees",
      value: dashboard.totalEmployees ?? "0",
      subtitle: "Across all departments",
      icon: FiUsers,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Present Today",
      value: dashboard.presentToday ?? "0",
      subtitle: "Today's attendance",
      icon: FiUserCheck,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Leave Requests",
      value: dashboard.pendingLeaves ?? "0",
      subtitle: "Awaiting approval",
      icon: FiCalendar,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Open Recruitments",
      value: dashboard.openRecruitments ?? "0",
      subtitle: "Hiring in progress",
      icon: FiUserPlus,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiUsers />
            Human Resources Dashboard
          </h2>

          <p className="mt-1 text-gray-500">
            Workforce overview, attendance, recruitment and HR insights.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-50"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <HRStatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Employee Growth Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Attendance Trend Chart
        </div>
      </div>

      {/* Widgets */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <FiCalendar />
            Pending Leave Requests
          </h3>

          <p className="text-gray-500">Display pending approvals here.</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <FiGift />
            Today's Birthdays
          </h3>

          <p className="text-gray-500">Employee birthdays will appear here.</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <FiActivity />
            Recent HR Activities
          </h3>

          <p className="text-gray-500">Recent HR events will appear here.</p>
        </div>
      </div>
    </div>
  );
}
