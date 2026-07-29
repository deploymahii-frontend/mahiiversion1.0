export default function GallerySection() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-600">Gallery</p>
          <h2 className="text-3xl font-bold">Capture the experience</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-56 rounded-3xl bg-slate-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
