import Order from "./order.model.js";

/**
 * Create Order
 */
export const create = (data) => Order.create(data);

/**
 * Find Order By ID
 */
export const findById = (id) =>
  Order.findById(id)
    .populate("customer", "fullName email mobile")
    .populate("shop", "name slug");

/**
 * Find Order By Number
 */
export const findByOrderNumber = (orderNumber) =>
  Order.findOne({ orderNumber });

/**
 * Customer Orders
 */
export const findByCustomer = (customerId) =>
  Order.find({ customer: customerId })
    .populate("shop", "name slug")
    .sort({ createdAt: -1 });

/**
 * Shop Orders
 */
export const findByShop = (shopId) =>
  Order.find({ shop: shopId })
    .populate("customer", "fullName mobile")
    .sort({ createdAt: -1 });

/**
 * Update Order
 */
export const update = (id, data) =>
  Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

/**
 * Delete Order
 */
export const remove = (id) => Order.findByIdAndDelete(id);

/**
 * Count Orders
 */
export const count = (filter = {}) => Order.countDocuments(filter);
