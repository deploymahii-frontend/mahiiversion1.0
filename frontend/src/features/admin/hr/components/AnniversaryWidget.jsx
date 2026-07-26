export default function AnniversaryWidget({ anniversaries = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Work Anniversaries</h2>
      <div className="mt-4 space-y-3">
        {anniversaries.slice(0, 4).map((item) => (
          <div key={item.id} className="rounded-xl border p-4">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.years} years</p>
          </div>
        ))}
      </div>
    </div>
  );
}
