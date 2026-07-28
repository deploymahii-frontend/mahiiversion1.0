import Order from "./order.model.js";

/**
 * Create Order
 */
export const create = async (data, session) => {
  const order = await Order.create([data], { session });
  return order[0];
};

/**
 * Find Order By ID
 */
export const findById = (id) =>
  Order.findOne({ _id: id, isDeleted: { $ne: true } })
    .populate("customer", "fullName email mobile")
    .populate("shop", "name slug");

/**
 * Find Order By Number
 */
export const findByOrderNumber = (orderNumber, session) =>
  Order.findOne({ orderNumber, isDeleted: { $ne: true } }).session(session);

/**
 * Customer Orders
 */
export const findByCustomer = (customerId) =>
  Order.find({ customer: customerId, isDeleted: { $ne: true } })
    .populate("shop", "name slug")
    .sort({ createdAt: -1 });

/**
 * Shop Orders
 */
export const findByShop = (shopId) =>
  Order.find({ shop: shopId, isDeleted: { $ne: true } })
    .populate("customer", "fullName mobile")
    .sort({ createdAt: -1 });

/**
 * Update Order
 */
export const update = (id, data, session) =>
  Order.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    session,
  });

/**
 * Delete Order (Soft Delete)
 */
export const remove = (id, session) =>
  Order.findByIdAndUpdate(
    id,
    { isDeleted: true, deletedAt: new Date() },
    { new: true, session }
  );

/**
 * Count Orders
 */
export const count = (filter = {}) => Order.countDocuments(filter);

/**
 * Find Orders By Status
 */
export const findOrdersByStatus = (status) =>
  Order.find({ orderStatus: status, isDeleted: { $ne: true } }).sort({ createdAt: -1 });

/**
 * Find Pending Orders
 */
export const findPendingOrders = () =>
  Order.find({ orderStatus: "PLACED", isDeleted: { $ne: true } }).sort({ createdAt: -1 });

/**
 * Find Active Orders
 */
export const findActiveOrders = () =>
  Order.find({
    orderStatus: { $in: ["PLACED", "ACCEPTED", "PREPARING", "READY"] },
    isDeleted: { $ne: true },
  }).sort({ createdAt: -1 });

/**
 * Count Shop Orders
 */
export const countShopOrders = (shopId) =>
  Order.countDocuments({ shop: shopId, isDeleted: { $ne: true } });

/**
 * Count Customer Orders
 */
export const countCustomerOrders = (customerId) =>
  Order.countDocuments({ customer: customerId, isDeleted: { $ne: true } });

/**
 * Find Delivered Orders
 */
export const findDeliveredOrders = () =>
  Order.find({ orderStatus: "DELIVERED", isDeleted: { $ne: true } }).sort({ createdAt: -1 });