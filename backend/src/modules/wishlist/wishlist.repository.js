import Wishlist from "./wishlist.model.js";

export const add = (data) => Wishlist.create(data);

export const remove = (customerId, shopId) =>
  Wishlist.findOneAndDelete({ customer: customerId, shop: shopId });

export const findByCustomer = (customerId) =>
  Wishlist.find({ customer: customerId }).populate("shop");

export const exists = (customerId, shopId) =>
  Wishlist.exists({ customer: customerId, shop: shopId });
