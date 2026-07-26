import {
  FiUsers,
  FiUserCheck,
  FiTrendingUp,
  FiDollarSign,
  FiRefreshCw,
  FiDownload,
  FiUsers as FiCustomers,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const pipelineData = [
  { stage: "Lead", value: 120 },
  { stage: "Contacted", value: 98 },
  { stage: "Qualified", value: 76 },
  { stage: "Proposal", value: 52 },
  { stage: "Negotiation", value: 35 },
  { stage: "Won", value: 24 },
];

const leadSourceData = [
  { name: "Website", value: 54 },
  { name: "Facebook", value: 27 },
  { name: "Instagram", value: 18 },
  { name: "Google", value: 40 },
  { name: "Referral", value: 22 },
  { name: "Walk-In", value: 12 },
];

const teamPerformance = [
  { name: "Asha", deals: 18 },
  { name: "Rohan", deals: 14 },
  { name: "Nisha", deals: 12 },
  { name: "Karan", deals: 10 },
];

const growthData = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 24 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 32 },
  { month: "May", value: 38 },
  { month: "Jun", value: 44 },
];

const COLORS = ["#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function CRMDashboard({ loading, dashboard = {}, onRefresh, onExport }) {
  const cards = [
    { title: "Total Leads", value: dashboard.totalLeads ?? 624 },
    { title: "Qualified Leads", value: dashboard.qualifiedLeads ?? 418 },
    { title: "Customers", value: dashboard.customers ?? 238 },
    { title: "Open Deals", value: dashboard.openDeals ?? 94 },
    { title: "Won Deals", value: dashboard.wonDeals ?? 72 },
    { title: "Lost Deals", value: dashboard.lostDeals ?? 18 },
    { title: "Revenue", value: dashboard.revenue ?? "₹1.2M" },
    { title: "Conversion Rate", value: dashboard.conversionRate ?? "14.5%" },
  ];

  const followUps = dashboard.followUps ?? [
    { customer: "Belmont Retail", time: "10:00 AM", owner: "Asha", priority: "High" },
    { customer: "Nova Tech", time: "11:30 AM", owner: "Rohan", priority: "Medium" },
    { customer: "Aarya Foods", time: "1:00 PM", owner: "Nisha", priority: "High" },
    { customer: "Sapphire Events", time: "3:15 PM", owner: "Karan", priority: "Low" },
  ];

  const activities = dashboard.activities ?? [
    "New Lead",
    "Call Logged",
    "Meeting Scheduled",
    "Proposal Sent",
    "Deal Won",
  ];

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[750px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white shadow-sm p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CRM Dashboard</h2>
          <p className="text-gray-500">Sales pipeline, lead sources, follow ups and customer growth.</p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3 hover:bg-gray-50">
            <FiRefreshCw />
          </button>
          <button onClick={onExport} className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.title === "Customers" ? FiCustomers : FiUsers;
          return (
            <div key={card.title} className="rounded-2xl bg-white shadow-sm p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold text-gray-900">{card.value}</h3>
                </div>
                <Icon className="text-3xl text-indigo-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Sales Pipeline</h3>
            <span className="text-sm text-gray-500">Stage progression</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Lead Sources</h3>
            <span className="text-sm text-gray-500">Top channels</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSourceData} dataKey="value" nameKey="name" outerRadius={110} innerRadius={50}>
                  {leadSourceData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Upcoming Follow Ups</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-600">
              <thead>
                <tr>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Time</th>
                  <th className="pb-3 font-semibold">Assigned To</th>
                  <th className="pb-3 font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((item, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-4">{item.customer}</td>
                    <td>{item.time}</td>
                    <td>{item.owner}</td>
                    <td>{item.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Sales Team Performance</h3>
            <span className="text-sm text-gray-500">Deals closed</span>
          </div>
          <div className="space-y-4">
            {teamPerformance.map((member) => (
              <div key={member.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{member.name}</p>
                    <p className="mt-1 text-xl font-semibold">{member.deals} deals</p>
                  </div>
                  <div className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {member.deals}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-gray-900">{activity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">Customer Growth</h3>
            <span className="text-sm text-gray-500">Monthly trend</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
