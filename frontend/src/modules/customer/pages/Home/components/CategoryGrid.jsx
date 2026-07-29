export default function CategoryGrid({ categories = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {categories.map((category) => (
          <button key={category._id || category.id} className="rounded-2xl bg-white p-4 shadow transition hover:shadow-lg">
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
