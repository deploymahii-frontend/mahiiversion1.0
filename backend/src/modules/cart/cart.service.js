import * as repository from "./cart.repository.js";
import { calculateCartTotals } from "./cart.helpers.js";

export async function getCart(customerId) {
  return repository.findCartByCustomer(customerId);
}

export async function addItem(customerId, item) {
  let cart = await repository.findCartByCustomer(customerId);

  if (!cart) {
    cart = await repository.createCart({
      customer: customerId,
      shop: item.shop,
      items: [],
    });
  }

  const existing = cart.items.find(
    (i) => i.product.toString() === item.product.toString()
  );

  if (existing) {
    existing.quantity += item.quantity;
    existing.total = existing.price * existing.quantity;
  } else {
    cart.items.push({
      ...item,
      total: item.price * item.quantity,
    });
  }

  Object.assign(cart, calculateCartTotals(cart));

  await cart.save();

  return cart;
}

export async function updateQuantity(
  customerId,
  productId,
  quantity
) {
  const cart = await repository.findCartByCustomer(customerId);

  if (!cart) return null;

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) return cart;

  item.quantity = quantity;
  item.total = item.price * quantity;

  Object.assign(cart, calculateCartTotals(cart));

  await cart.save();

  return cart;
}

export async function removeItem(customerId, productId) {
  const cart = await repository.findCartByCustomer(customerId);

  if (!cart) return null;

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );

  Object.assign(cart, calculateCartTotals(cart));

  await cart.save();

  return cart;
}

export async function clearCart(customerId) {
  return repository.deleteCart(customerId);
}
