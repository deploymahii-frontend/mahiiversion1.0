import * as repository from "./product.repository.js";

/**
 * Convert product name to SEO-friendly slug
 */
export function generateSlug(name) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}-${randomSuffix}`;
}

/**
 * Create Product
 */
export async function createProduct(data) {
  let slug = generateSlug(data.name || "product");

  let uniqueSlug = slug;
  let counter = 1;

  while (await repository.findBySlug(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  const sanitizedData = {
    ...data,
    name: data.name?.trim(),
    description: data.description?.trim() || "",
    sku: data.sku?.trim() || "",
    price: Number(data.price),
    discountedPrice: data.discountedPrice ? Number(data.discountedPrice) : null,
    inventory: {
      quantity: data.stock !== undefined ? Number(data.stock) : Number(data.inventory?.quantity || 100),
      trackInventory: data.trackInventory ?? true,
    },
    status: data.status || (data.available === false ? "INACTIVE" : "ACTIVE"),
    available: data.available ?? true,
    slug: uniqueSlug,
  };

  if (isNaN(sanitizedData.price) || sanitizedData.price <= 0) {
    throw new Error("Product price must be a valid positive number");
  }

  return repository.create(sanitizedData);
}

/**
 * Get Public Products with Filtering, Search & Pagination
 */
export async function getAllProducts(queryParams = {}) {
  const filter = { status: "ACTIVE" };

  if (queryParams.shopId) {
    filter.shop = queryParams.shopId;
  }

  if (queryParams.category) {
    filter.category = { $regex: queryParams.category, $options: "i" };
  }

  if (queryParams.search) {
    filter.$or = [
      { name: { $regex: queryParams.search, $options: "i" } },
      { description: { $regex: queryParams.search, $options: "i" } },
      { category: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  if (queryParams.minPrice || queryParams.maxPrice) {
    filter.price = {};
    if (queryParams.minPrice) filter.price.$gte = Number(queryParams.minPrice);
    if (queryParams.maxPrice) filter.price.$lte = Number(queryParams.maxPrice);
  }

  return repository.getAll(filter, queryParams);
}

/**
 * Get Product By ID
 */
export const getProduct = (id) => repository.findById(id);

/**
 * Get Product By Slug
 */
export const getProductBySlug = (slug) => repository.findBySlug(slug);

/**
 * Get Products Of Shop
 */
export const getShopProducts = (shopId) => repository.findByShop(shopId, { status: { $ne: "ARCHIVED" } });

/**
 * Update Product
 */
export const updateProduct = (id, data) => {
  const updatePayload = { ...data };
  if (data.price !== undefined) updatePayload.price = Number(data.price);
  if (data.discountedPrice !== undefined) updatePayload.discountedPrice = Number(data.discountedPrice);
  if (data.stock !== undefined) {
    updatePayload["inventory.quantity"] = Number(data.stock);
  }
  return repository.update(id, updatePayload);
};

/**
 * Delete Product (Soft delete / archive)
 */
export const deleteProduct = (id) => repository.remove(id);

/**
 * Search Products
 */
export const searchProducts = (keyword) => repository.searchProducts(keyword);

/**
 * Bulk Import Products
 */
export const bulkCreateProducts = (products) => repository.bulkCreateProducts(products);

/**
 * Decrease Inventory
 */
export const decreaseInventory = (productId, quantity) => repository.decreaseInventory(productId, quantity);

/**
 * Count Products
 */
export const countProducts = (filter = {}) => repository.count(filter);
