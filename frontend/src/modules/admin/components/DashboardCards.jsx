import { FiUsers, FiBriefcase, FiShoppingCart, FiDollarSign, FiFilm, FiBox, FiTool, FiAlertCircle } from "react-icons/fi";

export default function DashboardCards({ data }) {
  // Use data passed from the dashboard component rather than fetching here
  const dashboard = data || {};

  const cards = [
    { label: "TOTAL USERS", value: dashboard?.stats?.users ?? 0, icon: <FiUsers size={20} className="text-[#1a73e8]" /> },
    { label: "TOTAL BUSINESSES", value: dashboard?.stats?.shops ?? 0, icon: <FiBriefcase size={20} className="text-[#f9ab00]" /> },
    { label: "TOTAL ORDERS", value: dashboard?.stats?.orders ?? 0, icon: <FiShoppingCart size={20} className="text-[#34a853]" /> },
    { label: "REVENUE", value: `₹${(dashboard?.stats?.revenue ?? 0).toLocaleString('en-IN')}`, icon: <FiDollarSign size={20} className="text-[#ea4335]" /> },
    { label: "PENDING APPROVALS", value: dashboard?.pendingShops?.length ?? 0, icon: <FiAlertCircle size={20} className="text-[#d93025]" /> },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg bg-white p-5 border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-normal text-[#202124]">{card.value}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100">
            <div className="h-full bg-gray-200 w-1/3 group-hover:w-full transition-all duration-300"></div>
          </div>
        </div>
      ))}
    </section>
  );
}
