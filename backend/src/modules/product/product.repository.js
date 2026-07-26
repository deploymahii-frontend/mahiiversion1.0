import Product from "./product.model.js";

/**
 * Create Product
 */
export const createProduct = (productData) => {
  return Product.create(productData);
};

/**
 * Get Product By ID
 */
export const findProductById = (id) => {
  return Product.findById(id)
    .populate("shop", "name slug")
    .populate("owner", "name email");
};

/**
 * Get Product By Slug
 */
export const findProductBySlug = (slug) => {
  return Product.findOne({ slug });
};

/**
 * Get Shop Products
 */
export const findProductsByShop = (shopId) => {
  return Product.find({
    shop: shopId,
    status: "ACTIVE",
  }).sort({ createdAt: -1 });
};

/**
 * Update Product
 */
export const updateProduct = (id, data) => {
  return Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete Product
 */
export const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

/**
 * List Products
 */
export const listProducts = (filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 20,
    sort = { createdAt: -1 },
  } = options;

  return Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

/**
 * Search Products
 */
export const searchProducts = (filter) => {
  return Product.find(filter).sort({
    rating: -1,
  });
};
