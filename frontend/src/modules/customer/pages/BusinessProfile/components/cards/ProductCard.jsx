import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-2 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">₹{product.price}</span>
          <Button size="sm">Add</Button>
        </div>
      </div>
    </div>
  );
}
