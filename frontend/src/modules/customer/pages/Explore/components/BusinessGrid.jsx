const businesses = [
  {
    id: 1,
    name: "Shree Mess",
    category: "Mess",
    rating: 4.8,
    distance: "0.8 km",
    status: "Open",
    image: "/images/businesses/shree-mess.jpg",
  },
  {
    id: 2,
    name: "Urban Cafe",
    category: "Cafe",
    rating: 4.7,
    distance: "1.2 km",
    status: "Open",
    image: "/images/businesses/urban-cafe.jpg",
  },
  {
    id: 3,
    name: "Fresh Grocery",
    category: "Grocery",
    rating: 4.9,
    distance: "1.8 km",
    status: "Closed",
    image: "/images/businesses/grocery.jpg",
  },
];

export default function BusinessGrid() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg"
            >

              <img
                src={business.image}
                alt={business.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5 space-y-3">

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {business.category}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${business.status === "Open" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {business.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ {business.rating}</span>
                  <span>{business.distance}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium hover:border-yellow-400">
                    View
                  </button>
                  <button className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium hover:border-yellow-400">
                    Call
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
