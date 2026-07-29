export default function ServiceSection() {
  const services = [
    { name: 'Event Catering', eta: '1 day', badge: 'Popular' },
    { name: 'Home Delivery', eta: '30 mins', badge: 'Fast' },
    { name: 'Custom Menu', eta: '2 days', badge: 'Premium' },
  ];

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Services</p>
            <h2 className="text-3xl font-bold">What this business offers</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((item) => (
            <div key={item.name} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{item.badge}</span>
              </div>
              <p className="mt-4 text-sm text-gray-600">Estimated delivery: {item.eta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
