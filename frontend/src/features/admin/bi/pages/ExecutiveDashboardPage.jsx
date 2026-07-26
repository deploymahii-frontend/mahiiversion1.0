import {
  FiBarChart2,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

export default function ExecutiveDashboardPage({
  loading,
  summary = {},
  onRefresh,
  onExport,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const cards = [
    {
      icon: FiDollarSign,
      title: "Revenue",
      value: summary.revenue,
    },
    {
      icon: FiUsers,
      title: "Customers",
      value: summary.customers,
    },
    {
      icon: FiShoppingCart,
      title: "Orders",
      value: summary.orders,
    },
    {
      icon: FiPackage,
      title: "Inventory Value",
      value: summary.inventory,
    },
    {
      icon: FiTrendingUp,
      title: "Profit",
      value: summary.profit,
    },
    {
      icon: FiBarChart2,
      title: "Growth",
      value: summary.growth,
    },
  ];

  return (

    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBarChart2 />
            Executive Dashboard
          </h2>

          <p className="text-gray-500">
            Enterprise KPIs across all Mahii ERP modules.
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
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export Dashboard
          </button>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        {cards.map((card,index)=>(

          <div
            key={index}
            className="rounded-2xl bg-white shadow-sm p-6"
          >

            <card.icon size={30}/>

            <h3 className="mt-4 text-gray-500">
              {card.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
