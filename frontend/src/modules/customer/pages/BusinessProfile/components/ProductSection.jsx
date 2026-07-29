import ProductCard from "./cards/ProductCard";

export default function ProductSection({ products = [] }) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <span className="text-gray-500">{products.length} Items</span>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
