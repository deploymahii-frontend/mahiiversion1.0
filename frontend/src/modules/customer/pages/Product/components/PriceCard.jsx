export default function PriceCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Price</p>
          <p className="text-2xl font-semibold">₹180</p>
        </div>
        <div className="rounded-full bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700">Best seller</div>
      </div>
    </section>
  );
}
