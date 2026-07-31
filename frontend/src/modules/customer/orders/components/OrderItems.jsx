export default function OrderItems({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Items Ordered</h3>
      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div key={idx} className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                {item.quantity}x
              </span>
              <span className="font-medium text-slate-800">{item.name}</span>
            </div>
            <span className="font-semibold text-slate-900">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
