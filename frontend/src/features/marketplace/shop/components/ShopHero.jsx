export default function ShopHero({ shop }) {
  if (!shop) return null;

  return (
    <section className="relative w-full bg-white border-b border-gray-100 pb-6 pt-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{shop.name}</h1>
              <p className="text-sm text-slate-500 mt-1">{shop.category || "Local shop"}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium">
                <span className={"rounded-full px-3 py-1 " + (shop.isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800")}>
                  {shop.isOpen ? "Open Now" : "Closed"}
                </span>
                {shop.isVerified && (
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Verified</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
