export default function OrderCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Recent orders</h2>
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="font-medium">Veg Thali</p>
        <p className="mt-2 text-sm text-slate-600">Delivered • 2 items • ₹280</p>
      </div>
    </section>
  );
}
