import * as repository from "./product.repository.js";
import {
  generateSlug,
  generateUniqueSlug,
} from "./product.helpers.js";
import { buildProductFilter } from "./product.search.js";

/**
 * Create Product
 */
export const createProduct = async (productData) => {
  let slug = generateSlug(productData.name);

  let count = 0;

  while (
    await repository.findProductBySlug(
      generateUniqueSlug(slug, count)
    )
  ) {
    count++;
  }

  slug = generateUniqueSlug(slug, count);

  return repository.createProduct({
    ...productData,
    slug,
  });
};

/**
 * Get Product
 */
export const getProduct = (id) => {
  return repository.findProductById(id);
};

/**
 * Get Shop Products
 */
export const getShopProducts = (shopId) => {
  return repository.findProductsByShop(shopId);
};

/**
 * Update Product
 */
export const updateProduct = (id, data) => {
  return repository.updateProduct(id, data);
};

/**
 * Delete Product
 */
export const deleteProduct = (id) => {
  return repository.deleteProduct(id);
};

/**
 * List Products
 */
export const listProducts = (query, options) => {
  return repository.listProducts(
    buildProductFilter(query),
    options
  );
};

/**
 * Search Products
 */
export const searchProducts = (query) => {
  return repository.searchProducts(
    buildProductFilter(query)
  );
};
