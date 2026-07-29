export default function QuantitySelector() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Quantity</h2>
      <div className="mt-4 flex items-center gap-3">
        <button className="h-10 w-10 rounded-full bg-slate-100 text-xl">-</button>
        <span className="text-lg font-semibold">1</span>
        <button className="h-10 w-10 rounded-full bg-slate-100 text-xl">+</button>
      </div>
    </section>
  );
}
