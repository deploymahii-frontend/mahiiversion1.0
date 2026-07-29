import Cart from "./cart.model.js";

/**
 * Find Cart By Customer
 */
export const findCart = (customerId) =>
  Cart.findOne({ customer: customerId })
    .populate("items.product")
    .populate("shop", "name slug");

/**
 * Find Cart By ID
 */
export const findById = (id) =>
  Cart.findById(id)
    .populate("items.product")
    .populate("shop", "name slug");

/**
 * Create Cart
 */
export const createCart = (data) =>
  Cart.create(data);

/**
 * Save Cart
 */
export const saveCart = (cart) =>
  cart.save();

/**
 * Delete Cart
 */
export const deleteCart = (customerId, session) =>
  Cart.deleteOne(
      {
          customer: customerId,
      },
      {
          session,
      }
  );

/**
 * Clear Cart Items
 */
export const clearCart = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId });

  if (!cart) return null;

  cart.items = [];
  cart.subTotal = 0;
  cart.discount = 0;
  cart.tax = 0;
  cart.deliveryCharge = 0;
  cart.grandTotal = 0;

  return cart.save();
};
