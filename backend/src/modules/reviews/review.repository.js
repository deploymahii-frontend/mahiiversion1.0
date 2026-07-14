import Review from "./review.model.js";

export const create = (data) => Review.create(data);

export const findByShop = (shopId) =>
  Review.find({ shop: shopId })
    .populate("customer", "fullName profileImage")
    .sort({ createdAt: -1 });

export const findByCustomer = (customerId) =>
  Review.find({ customer: customerId });

export const findById = (id) => Review.findById(id);

export const remove = (id) => Review.findByIdAndDelete(id);
