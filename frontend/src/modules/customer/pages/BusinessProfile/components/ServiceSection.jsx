import ServiceCard from "./cards/ServiceCard";

export default function ServiceSection({ services = [] }) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Services</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}
