import {
  FiDollarSign,
  FiCreditCard,
  FiFileText,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

export default function Payroll({
  loading,
  overview = {},
  payrolls = [],
  search = "",
  onSearch,
  onRefresh,
  onGeneratePayslip,
  onApprovePayroll,
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
      title: "Payroll Processed",
      value: overview.processed ?? 0,
      icon: FiDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Pending Approval",
      value: overview.pending ?? 0,
      icon: FiCreditCard,
      color: "bg-yellow-500",
    },
    {
      title: "Payslips Generated",
      value: overview.payslips ?? 0,
      icon: FiFileText,
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: overview.completed ?? 0,
      icon: FiCheckCircle,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payroll</h2>
          <p className="text-gray-500">
            Salary processing, deductions, payslips and approvals.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
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
                  <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
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
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search employee..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>
      </div>

      {/* Payroll Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Gross Salary</th>
              <th className="p-4 text-left">Net Salary</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4">{item.employee}</td>
                <td className="p-4">{item.month}</td>
                <td className="p-4">{item.grossSalary}</td>
                <td className="p-4">{item.netSalary}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onGeneratePayslip?.(item)}
                      className="rounded bg-blue-600 px-3 py-2 text-white"
                    >
                      Payslip
                    </button>

                    <button
                      onClick={() => onApprovePayroll?.(item)}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Approve
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Salary Structure • Bonuses • Deductions • Tax • PF • ESI • Bank Transfer
      </div>

    </div>
  );
}
