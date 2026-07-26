export default function VariantSelector() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Choose style</h2>
      <div className="mt-4 flex gap-3">
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Regular</button>
        <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Spicy</button>
      </div>
    </section>
  );
}
