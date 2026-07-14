import Product from "./product.model.js";

export const create = (data) => Product.create(data);

export const findById = (id) =>
  Product.findById(id).populate("shop", "name slug");

export const findBySlug = (slug) =>
  Product.findOne({ slug }).populate("shop", "name slug");

export const findByShop = (shopId) =>
  Product.find({ shop: shopId })
    .sort({ createdAt: -1 });

export const update = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

export const remove = (id) =>
  Product.findByIdAndDelete(id);

export const getAll = (filter = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
  } = options;

  return Product.find(filter)
    .populate("shop", "name slug")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const count = (filter = {}) =>
  Product.countDocuments(filter);

export const search = (keyword) =>
  Product.find({
    $text: {
      $search: keyword,
    },
  }).populate("shop", "name slug");
