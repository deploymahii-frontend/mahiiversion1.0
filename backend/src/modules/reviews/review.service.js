import * as repository from "./review.repository.js";

export const createReview = (data) => repository.create(data);

export const getShopReviews = (shopId) => repository.findByShop(shopId);

export const getCustomerReviews = (customerId) =>
  repository.findByCustomer(customerId);

export const deleteReview = (id) => repository.remove(id);
