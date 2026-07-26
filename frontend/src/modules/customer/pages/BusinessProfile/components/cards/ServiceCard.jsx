import Button from "@/components/ui/Button";

export default function ServiceCard({ service }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <img src={service.image} alt={service.name} className="h-40 w-full rounded-xl object-cover" />
      <h3 className="mt-3 text-lg font-bold">{service.name}</h3>
      <p className="mt-2 text-gray-500">{service.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">₹{service.price}</span>
        <Button>Book</Button>
      </div>
    </div>
  );
}
