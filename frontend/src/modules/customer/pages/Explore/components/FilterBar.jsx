import Button from "@/components/ui/Button";

export default function FilterBar({ filters, setFilters }) {
  return (
    <section className="border-b bg-white">
      <div className="flex gap-3 overflow-x-auto p-4">
        <Button variant="outline">Nearby</Button>
        <Button variant="outline">Open</Button>
        <Button variant="outline">Rating 4+</Button>
        <Button variant="outline">Price</Button>
        <Button variant="outline">Category</Button>
      </div>
    </section>
  );
}
