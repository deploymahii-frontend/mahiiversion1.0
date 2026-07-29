export default function ServiceGrid() {
  const services = [
    { name: "Home Delivery", detail: "Fast doorstep delivery" },
    { name: "Event Catering", detail: "Chef-curated catering" },
    { name: "Custom Menu", detail: "Tailored meal plans" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service) => (
        <div key={service.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{service.detail}</p>
        </div>
      ))}
    </div>
  );
}
