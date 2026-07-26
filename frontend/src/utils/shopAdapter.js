export function mapShop(shop) {
  return {
    id: shop._id,
    slug: shop.slug,
    name: shop.name,
    image: shop.coverImage || shop.logo || "/images/shop-placeholder.jpg",
    category: shop.category || "Shop",
    rating: shop.rating ?? 0,
    distance: shop.distance || "Nearby",
    price: shop.minimumOrder ? `₹${shop.minimumOrder}` : "—",
    open: Boolean(shop.isOpen),
    address: shop.address?.city || "",
    raw: shop,
  };
}

export function mapShops(shops = []) {
  return shops.map(mapShop);
}
