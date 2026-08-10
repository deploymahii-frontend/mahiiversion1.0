import * as repository from "./cart.repository.js";
import * as offerRepository from "../offers/offer.repository.js";
import Product from "../products/product.model.js";

function calculateDiscount(offer, subTotal) {
  if (!offer) {
    return 0;
  }

  if (offer.type === "percentage") {
    return Math.min(
      Math.round((subTotal * offer.value) / 100),
      subTotal
    );
  }

  return Math.min(offer.value, subTotal);
}

function calculateTotals(cart, offer = null) {
  cart.subTotal = cart.items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  if (offer) {
    cart.couponCode = offer.couponCode;
    cart.couponId = offer._id;
    cart.couponType = offer.type;
    cart.discount = calculateDiscount(offer, cart.subTotal);
  }

  cart.grandTotal =
    cart.subTotal -
    cart.discount +
    cart.tax +
    cart.deliveryCharge;

  if (cart.grandTotal < 0) {
    cart.grandTotal = 0;
  }
}

async function findValidCoupon(shopId, couponCode) {
  if (!couponCode) {
    return null;
  }

  return offerRepository.findActiveCouponByCode(
    shopId,
    couponCode
  );
}

async function rebuildCartTotals(cart) {
  const offer =
    cart.couponCode && cart.subTotal > 0
      ? await findValidCoupon(cart.shop._id, cart.couponCode)
      : null;

  if (!offer && cart.couponCode) {
    cart.couponCode = "";
    cart.couponId = null;
    cart.couponType = "";
    cart.discount = 0;
  }

  calculateTotals(cart, offer);
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

  const cartShopId = cart.shop?._id || cart.shop;
  const productShopId = product.shop?._id || product.shop;

  if (cart.items.length > 0 && String(cartShopId) !== String(productShopId)) {
    // If cart has items from another shop, reset shop & clear old items
    cart.shop = productShopId;
    cart.items = [];
  }

  const existing = cart.items.find((item) => {
    const itemPid = item.product?._id || item.product;
    return String(itemPid) === String(product._id);
  });

  if (existing) {
    existing.quantity += quantity;
    existing.total = existing.quantity * existing.price;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name || "Item",
      image: product.images?.[0] || product.image || "",
      quantity,
      price: product.price,
      total: quantity * product.price,
    });
  }

  await rebuildCartTotals(cart);

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

  await rebuildCartTotals(cart);

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

  await rebuildCartTotals(cart);

  return repository.saveCart(cart);
}

export async function applyCoupon(customerId, couponCode) {
  const cart = await repository.findCart(customerId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  if (!couponCode || !couponCode.trim()) {
    throw new Error("Coupon code is required.");
  }

  const offer = await findValidCoupon(cart.shop._id, couponCode);

  if (!offer) {
    throw new Error("Invalid or expired coupon code.");
  }

  if (cart.subTotal < (offer.minimumOrder || 0)) {
    throw new Error(
      `Minimum order value for this coupon is ₹${offer.minimumOrder}.`
    );
  }

  cart.couponCode = offer.couponCode;
  cart.couponId = offer._id;
  cart.couponType = offer.type;
  cart.discount = calculateDiscount(offer, cart.subTotal);

  await calculateTotals(cart, offer);

  return repository.saveCart(cart);
}

export async function removeCoupon(customerId) {
  const cart = await repository.findCart(customerId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.couponCode = "";
  cart.couponId = null;
  cart.couponType = "";
  cart.discount = 0;

  await calculateTotals(cart);

  return repository.saveCart(cart);
}

export async function clearCart(customerId) {
  return repository.clearCart(customerId);
}
