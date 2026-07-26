import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TrendingProducts({ products = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Trending Products</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product._id || product.id}>
            <div className="h-48 rounded-xl bg-gray-200" />
            <h3 className="mt-4 font-semibold">{product.name}</h3>
            <p className="mt-2 text-lg font-bold">₹{product.price}</p>
            <Button className="mt-4 w-full">Add to Cart</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
