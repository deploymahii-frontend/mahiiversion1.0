import { Link } from "react-router-dom";

import ShopStatusBadge from "./ShopStatusBadge";
import ShopActionMenu from "./ShopActionMenu";

export default function ShopRow({
  shop,
  onRefresh,
}) {
  return (
    <tr className="border-b transition hover:bg-gray-50">

      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <img
            src={
              shop.logo ||
              shop.images?.[0] ||
              "/images/shop-placeholder.png"
            }
            alt={shop.name}
            className="h-14 w-14 rounded-xl object-cover"
          />

          <div>

            <Link
              to={`/admin/shops/${shop._id}`}
              className="font-semibold hover:text-orange-500"
            >
              {shop.name}
            </Link>

            <p className="text-sm text-gray-500">
              {shop.phone}
            </p>

          </div>

        </div>

      </td>

      <td className="px-6 py-4">

        <div>

          <p className="font-medium">
            {shop.owner?.name}
          </p>

          <p className="text-sm text-gray-500">
            {shop.owner?.email}
          </p>

        </div>

      </td>

      <td className="px-6 py-4">
        {shop.category}
      </td>

      <td className="px-6 py-4">
        {shop.city}
      </td>

      <td className="px-6 py-4">
        <ShopStatusBadge
          status={shop.status}
        />
      </td>

      <td className="px-6 py-4">

        <ShopActionMenu
          shop={shop}
          onUpdated={onRefresh}
        />

      </td>

    </tr>
  );
}
