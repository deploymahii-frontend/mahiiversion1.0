export default function WishlistGrid() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Wishlist</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {['Paneer Wrap', 'Biryani', 'Falooda'].map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
