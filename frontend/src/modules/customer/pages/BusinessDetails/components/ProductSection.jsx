export default function ProductSection() {
  const products = [
    { name: 'Veg Thali', price: '₹120', description: 'Daily fresh home-cooked meals.' },
    { name: 'Paneer Butter Masala', price: '₹180', description: 'Creamy and rich curry with paneer.' },
    { name: 'Masala Dosa', price: '₹90', description: 'Crispy dosa with spicy potato filling.' },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-600">Products</p>
            <h2 className="text-3xl font-bold">Popular picks</h2>
          </div>
          <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">View menu</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((item) => (
            <div key={item.name} className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <span>{item.price}</span>
                <button className="rounded-full bg-yellow-500 px-3 py-2 text-white">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
