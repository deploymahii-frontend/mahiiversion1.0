/**
 * shopAdapter.js
 * Normalize shop and product data from backend
 */

export function mapShop(shop) {
  return {
    id: shop._id || shop.id,
    name: shop.name,
    slug: shop.slug,
    coverImage: shop.coverImage || shop.image,
    image: shop.coverImage || shop.image,
    rating: shop.rating || 0,
    reviewCount: shop.reviewCount || 0,
    minimumOrder: shop.minimumOrder || 0,
    deliveryTime: shop.deliveryTime || "30-40 mins",
    category: shop.category,
    isOpen: shop.isOpen ?? true,
    distance: shop.distance,
    averagePrice: shop.averagePrice,
    raw: shop,
  };
}

export function mapShops(shops) {
  return shops.map(mapShop);
}

export function mapProduct(product) {
  return {
    id: product._id || product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    isVeg: product.isVeg ?? true,
    rating: product.rating || 0,
    preparationTime: product.preparationTime || "15 mins",
    raw: product,
  };
}

export function mapProducts(products) {
  return products.map(mapProduct);
}

