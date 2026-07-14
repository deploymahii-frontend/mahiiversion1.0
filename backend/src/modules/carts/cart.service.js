import * as repository from "./cart.repository.js";
import Product from "../products/product.model.js";

function calculateTotals(cart) {
  cart.subTotal = cart.items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  cart.grandTotal =
    cart.subTotal -
    cart.discount +
    cart.tax +
    cart.deliveryCharge;
}

export async function addToCart(customerId, productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await repository.findCart(customerId);

  if (!cart) {
    cart = await repository.createCart({
      customer: customerId,
      shop: product.shop,
      items: [],
    });
  }

  if (String(cart.shop) !== String(product.shop)) {
    throw new Error(
      "A cart can only contain products from one shop."
    );
  }

  const existing = cart.items.find(
    (item) => String(item.product._id) === String(product._id)
  );

  if (existing) {
    existing.quantity += quantity;
    existing.total = existing.quantity * existing.price;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
      total: quantity * product.price,
    });
  }

  calculateTotals(cart);

  return repository.saveCart(cart);
}

export async function getCart(customerId) {
  return repository.findCart(customerId);
}

export async function removeFromCart(customerId, productId) {
  const cart = await repository.findCart(customerId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => String(item.product._id) !== String(productId)
  );

  calculateTotals(cart);

  return repository.saveCart(cart);
}

export async function updateQuantity(
  customerId,
  productId,
  quantity
) {
  const cart = await repository.findCart(customerId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (i) => String(i.product._id) === String(productId)
  );

  if (!item) {
    throw new Error("Product not found in cart");
  }

  item.quantity = quantity;
  item.total = quantity * item.price;

  calculateTotals(cart);

  return repository.saveCart(cart);
}

export async function clearCart(customerId) {
  return repository.clearCart(customerId);
}
