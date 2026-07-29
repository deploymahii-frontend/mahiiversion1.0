export default function PayrollWidget({ payroll = {} }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Payroll Summary</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="mt-2 text-2xl font-semibold">{payroll.monthly ?? "₹0"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Next Cycle</p>
          <p className="mt-2 text-2xl font-semibold">{payroll.nextCycle ?? "₹0"}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {(payroll.items || []).slice(0, 3).map((item) => (
          <div key={item.id} className="rounded-xl border p-4">
            <p className="font-semibold">{item.label}</p>
            <p className="text-sm text-gray-500">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
