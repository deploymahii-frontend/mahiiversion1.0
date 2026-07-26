import ShopCard from "../home/ShopCard";

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto mt-14">
      <h2 className="text-3xl font-bold mb-8">More From This Shop</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ShopCard
            key={product._id}
            shop={{
              id: product._id,
              name: product.name,
              image: product.images?.[0],
              rating: product.rating,
              category: product.category,
              price: product.discountedPrice || product.price,
              open: product.isAvailable,
              distance: "",
            }}
          />
        ))}
      </div>
    </section>
  );
}
