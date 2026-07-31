export default function EmptyShops({ message = "No shops found nearby." }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center mt-6">
      <h2 className="text-xl font-bold text-slate-700">No Shops Found</h2>
      <p className="mt-3 text-slate-500">{message}</p>
    </div>
  );
}
