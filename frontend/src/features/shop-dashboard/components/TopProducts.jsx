const demoProducts = [
  {
    id: 1,
    name: "Special Veg Thali",
    sold: 152,
    revenue: 18240,
    image: "/images/placeholder-food.png",
  },
  {
    id: 2,
    name: "Paneer Biryani",
    sold: 98,
    revenue: 13720,
    image: "/images/placeholder-food.png",
  },
  {
    id: 3,
    name: "Cold Coffee",
    sold: 87,
    revenue: 6090,
    image: "/images/placeholder-food.png",
  },
];

export default function TopProducts({ products = demoProducts }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Products</h2>

        <button className="text-sm font-medium text-orange-500 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.sold} Sold</p>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{product.revenue}</p>
              <p className="text-sm text-green-600">Top Seller</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
