import Product from "./product.model.js";

const POPULATE_SHOP = { path: "shop", select: "name slug logo averageRating address owner" };

export const create = (data) => Product.create(data);

export const findById = (id) =>
  Product.findById(id).populate(POPULATE_SHOP);

export const findBySlug = (slug) =>
  Product.findOne({ slug }).populate(POPULATE_SHOP);

export const findByShop = (shopId, extraFilter = {}) =>
  Product.find({ shop: shopId, ...extraFilter })
    .sort({ createdAt: -1 });

export const update = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

export const remove = (id) =>
  Product.findByIdAndUpdate(id, { status: "ARCHIVED", available: false }, { new: true });

export const getAll = async (filter = {}, options = {}) => {
  const page = parseInt(options.page, 10) || 1;
  const limit = parseInt(options.limit, 10) || 20;
  const skip = (page - 1) * limit;

  let sort = { createdAt: -1 };
  if (options.sort === "price_asc") sort = { price: 1 };
  if (options.sort === "price_desc") sort = { price: -1 };
  if (options.sort === "rating") sort = { "rating.average": -1 };
  if (options.sort === "newest") sort = { createdAt: -1 };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate(POPULATE_SHOP)
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return { products, total, page, totalPages: Math.ceil(total / limit) };
};

export const count = (filter = {}) => Product.countDocuments(filter);

export const searchProducts = async (queryStr, extraFilter = {}) => {
  const filter = {
    ...extraFilter,
    $or: [
      { name: { $regex: queryStr, $options: "i" } },
      { description: { $regex: queryStr, $options: "i" } },
      { category: { $regex: queryStr, $options: "i" } },
    ],
  };

  return Product.find(filter).populate(POPULATE_SHOP).sort({ createdAt: -1 });
};

export const createProduct = (data) => Product.create(data);

export const getProducts = (shopId) => Product.find({ shop: shopId }).populate(POPULATE_SHOP);

export const updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });

export const bulkCreateProducts = (products) => Product.insertMany(products);

export const decreaseInventory = async (productId, quantity) => {
  await Product.findByIdAndUpdate(productId, {
    $inc: { "inventory.quantity": -quantity },
  });
};
