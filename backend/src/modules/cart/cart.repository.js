import Cart from "./cart.model.js";

export const findCartByCustomer = (customerId) => {
  return Cart.findOne({ customer: customerId })
    .populate("shop", "name slug")
    .populate("items.product");
};

export const createCart = (data) => {
  return Cart.create(data);
};

export const updateCart = (id, data) => {
  return Cart.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCart = (customerId) => {
  return Cart.findOneAndDelete({
    customer: customerId,
  });
};
