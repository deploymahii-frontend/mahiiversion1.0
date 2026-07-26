export default function ShopStats({ shop }) {
  if (!shop) return null;

  return (
    <div className="p-6 bg-orange-50 grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-gray-600 text-sm">Rating</p>
        <p className="text-lg font-bold">{shop.rating.toFixed(1)}★</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm">Delivery</p>
        <p className="text-lg font-bold">{shop.deliveryTime}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm">Avg Price</p>
        <p className="text-lg font-bold">₹{shop.averagePrice}</p>
      </div>
    </div>
  );
}
