export default function GallerySection() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Gallery</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </section>
  );
}
