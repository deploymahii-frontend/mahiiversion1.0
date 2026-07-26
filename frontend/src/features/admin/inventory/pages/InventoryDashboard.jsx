import {
  FiPackage,
  FiAlertTriangle,
  FiTrendingUp,
  FiHome,
  FiTruck,
  FiRefreshCw,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";

export default function InventoryDashboard({
  loading,
  overview = {},
  onRefresh,
  onExport,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: overview.totalProducts ?? 0,
      icon: FiPackage,
      color: "bg-blue-500",
    },
    {
      title: "Inventory Value",
      value: overview.inventoryValue ?? "₹0",
      icon: FiTrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: overview.lowStock ?? 0,
      icon: FiAlertTriangle,
      color: "bg-red-500",
    },
    {
      title: "Warehouses",
      value: overview.warehouses ?? 0,
      icon: FiHome,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Dashboard</h2>
          <p className="text-gray-500">
            Monitor stock levels, warehouses and inventory operations.
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
            className="rounded-lg bg-green-600 text-white px-5"
          >
            <FiDownload className="inline mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white shadow-sm p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Widgets */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Stock Movement
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Stock In / Stock Out Chart
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-8">
          <h3 className="font-semibold mb-4">
            Warehouse Distribution
          </h3>

          <div className="h-72 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
            Warehouse Chart
          </div>
        </div>

      </div>

      {/* Operations Summary */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck className="mb-3 text-blue-600" size={22} />
          <h4 className="font-semibold">Incoming Purchase Orders</h4>
          <p className="text-gray-500 mt-2">
            Monitor supplier deliveries awaiting receipt.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle className="mb-3 text-red-600" size={22} />
          <h4 className="font-semibold">Low Stock Alerts</h4>
          <p className="text-gray-500 mt-2">
            Products below reorder level requiring procurement.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBarChart2 className="mb-3 text-green-600" size={22} />
          <h4 className="font-semibold">Inventory Health</h4>
          <p className="text-gray-500 mt-2">
            Overall stock utilization and inventory performance.
          </p>
        </div>

      </div>

    </div>
  );
}
