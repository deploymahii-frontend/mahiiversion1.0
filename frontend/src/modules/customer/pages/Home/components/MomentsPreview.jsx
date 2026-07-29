import Card from "@/components/ui/Card";

export default function MomentsPreview({ moments = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Mahii Moments</h2>
        <button className="text-blue-600">View All</button>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {moments.map((item) => (
          <Card key={item._id || item.id}>
            <div className="aspect-[9/16] rounded-xl bg-gray-300" />
          </Card>
        ))}
      </div>
    </section>
  );
}
