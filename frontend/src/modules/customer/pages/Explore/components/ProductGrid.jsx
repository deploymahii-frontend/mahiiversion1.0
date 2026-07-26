export default function ProductGrid() {
  const items = [
    { name: "Veg Thali", price: "₹120" },
    { name: "Masala Dosa", price: "₹90" },
    { name: "Paneer Wrap", price: "₹140" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-24 rounded-2xl bg-slate-100" />
          <h3 className="mt-4 font-semibold">{item.name}</h3>
          <p className="mt-2 text-sm text-slate-600">Freshly prepared local favorites</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold">{item.price}</span>
            <button className="rounded-full bg-yellow-500 px-3 py-2 text-sm font-medium text-white">Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
