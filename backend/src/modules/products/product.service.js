import * as repository from "./product.repository.js";

/**
 * Convert product name to SEO-friendly slug
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Create Product
 */
export async function createProduct(data) {
  let slug = generateSlug(data.name);

  let uniqueSlug = slug;
  let counter = 1;

  while (await repository.findBySlug(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  return repository.create({
    ...data,
    slug: uniqueSlug,
  });
}

/**
 * Get All Products
 */
export const getAllProducts = (filter = {}, options = {}) =>
  repository.getAll(filter, options);

/**
 * Get Product By ID
 */
export const getProduct = (id) =>
  repository.findById(id);

/**
 * Get Product By Slug
 */
export const getProductBySlug = (slug) =>
  repository.findBySlug(slug);

/**
 * Get Products Of Shop
 */
export const getShopProducts = (shopId) =>
  repository.findByShop(shopId);

/**
 * Update Product
 */
export const updateProduct = (id, data) =>
  repository.update(id, data);

/**
 * Delete Product
 */
export const deleteProduct = (id) =>
  repository.remove(id);

/**
 * Search Products
 */
export const searchProducts = (keyword) =>
  repository.search(keyword);

/**
 * Count Products
 */
export const countProducts = (filter = {}) =>
  repository.count(filter);
