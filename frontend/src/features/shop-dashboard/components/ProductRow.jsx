import { Link } from "react-router-dom";
import StockBadge from "./StockBadge";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductActionMenu from "./ProductActionMenu";

export default function ProductRow({ product }) {
  return (
    <tr className="border-b transition hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={
              product.images?.[0] ||
              product.image ||
              "/images/placeholder-food.png"
            }
            alt={product.name}
            className="h-14 w-14 rounded-xl object-cover"
          />

          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">{product.category}</td>

      <td className="px-6 py-4 font-semibold">₹{product.price}</td>

      <td className="px-6 py-4">
        <StockBadge stock={product.stock} />
      </td>

      <td className="px-6 py-4">
        <ProductStatusBadge available={product.available} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Link
            to={`/shop/products/${product._id}`}
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            View
          </Link>

          <ProductActionMenu product={product} />
        </div>
      </td>
    </tr>
  );
}
