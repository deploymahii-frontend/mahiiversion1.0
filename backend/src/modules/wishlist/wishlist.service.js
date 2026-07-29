import * as repository from "./wishlist.repository.js";

export const addToWishlist = async (customerId, shopId) => {
  const alreadyExists = await repository.exists(customerId, shopId);

  if (alreadyExists) {
    return alreadyExists;
  }

  return repository.add({ customer: customerId, shop: shopId });
};

export const removeFromWishlist = (customerId, shopId) =>
  repository.remove(customerId, shopId);

export const getWishlist = (customerId) =>
  repository.findByCustomer(customerId);
