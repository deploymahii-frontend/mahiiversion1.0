export default function AccountStats({ stats = {} }) {
  const items = [
    { label: "Orders", value: stats.orders ?? 45, color: "text-blue-600 dark:text-blue-400" },
    { label: "Wishlist", value: stats.wishlist ?? 18, color: "text-rose-500 dark:text-rose-400" },
    { label: "Reviews", value: stats.reviews ?? 12, color: "text-amber-500 dark:text-amber-400" },
    { label: "Reward Points", value: stats.points ?? 520, color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm text-center transition-all hover:scale-[1.02]"
        >
          <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
}
