import {
  FiWallet,
  FiUsers,
  FiHome,
  FiLayers,
  FiPlusCircle,
  FiMinusCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiBarChart2,
} from "react-icons/fi";

export default function WalletManagement({
  loading,
  overview = {},
  wallets = [],
  search = "",
  onSearch,
  onRefresh,
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
      title: "Customer Wallets",
      value: overview.customerWallets ?? 0,
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      title: "Merchant Wallets",
      value: overview.merchantWallets ?? 0,
      icon: FiHome,
      color: "bg-green-500",
    },
    {
      title: "Platform Balance",
      value: overview.platformBalance ?? "₹0",
      icon: FiLayers,
      color: "bg-purple-500",
    },
    {
      title: "Total Wallet Value",
      value: overview.totalWalletValue ?? "₹0",
      icon: FiWallet,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Wallet Management
            </h2>

            <p className="text-gray-500">
              Monitor customer, merchant and platform wallets.
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

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

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

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search Wallet ID / User / Merchant..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* Wallet Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Wallet ID</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {wallets.map((wallet) => (
              <tr
                key={wallet.id}
                className="border-t"
              >
                <td className="p-4">{wallet.walletId}</td>
                <td className="p-4">{wallet.owner}</td>
                <td className="p-4">{wallet.type}</td>
                <td className="p-4">{wallet.balance}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {wallet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">

        <button className="rounded-xl bg-green-600 p-4 text-white">
          <FiPlusCircle className="mr-2 inline" />
          Credit Wallet
        </button>

        <button className="rounded-xl bg-red-600 p-4 text-white">
          <FiMinusCircle className="mr-2 inline" />
          Debit Wallet
        </button>

      </div>

      {/* Analytics Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        <FiBarChart2
          className="mx-auto mb-3"
          size={30}
        />
        Wallet Balance • Credits vs Debits • Ledger Activity • Wallet Trends
      </div>

    </div>
  );
}
