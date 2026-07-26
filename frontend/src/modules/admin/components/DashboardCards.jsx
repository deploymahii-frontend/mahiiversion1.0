const cards = [
  { label: "Total Users", value: "35.2k" },
  { label: "Total Businesses", value: "1.8k" },
  { label: "Active Orders", value: "1.2k" },
  { label: "Revenue", value: "₹14.5M" },
  { label: "Mahii Moments", value: "840" },
  { label: "Products", value: "12.3k" },
  { label: "Services", value: "2.5k" },
  { label: "Support Tickets", value: "74" },
];

export default function DashboardCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
        </div>
      ))}
    </section>
  );
}
