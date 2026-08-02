export default function ShopHero({ shop }) {
  if (!shop) return null;

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      <div className="relative h-56 md:h-72 overflow-hidden bg-gray-200">
        <img
          src={shop.coverImage}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute left-1/2 top-44 w-[92%] -translate-x-1/2 rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 md:w-[85%] lg:w-[75%]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <img
                src={shop.logo}
                alt={`${shop.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{shop.name}</h1>
              <p className="text-sm text-slate-500">{shop.category || "Local shop"}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium">
                <span className={"rounded-full px-3 py-1 " + (shop.isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800")}>
                  {shop.isOpen ? "Open Now" : "Closed"}
                </span>
                {shop.isVerified && (
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Verified</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-3xl bg-slate-50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Rating</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{shop.rating?.toFixed?.(1) ?? "—"}★</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Reviews</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{shop.reviewCount ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Followers</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{shop.followers ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Delivery</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{shop.deliveryTime ?? "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
