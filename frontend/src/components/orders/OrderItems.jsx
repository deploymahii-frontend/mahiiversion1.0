export default function OrderItems({ items }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Ordered Items</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.product} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500">Qty {item.quantity}</p>
            </div>

            <strong>₹{item.total}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
