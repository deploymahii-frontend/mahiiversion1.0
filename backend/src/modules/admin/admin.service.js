import * as repository from "./admin.repository.js";
import { ORDER_STATUS } from "../orders/order.constants.js";

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  const name =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return {
    id: user._id,
    name: name || user.username || "",
    email: user.email,
    phone: user.phone || user.mobile,
    role:
      typeof user.role === "string"
        ? user.role
        : user.role?.name || user.role || "",
    status:
      (user.accountStatus || user.status || "").toString().toUpperCase(),
    verified: Boolean(user.emailVerified || user.phoneVerified || user.verified),
    createdAt: user.createdAt,
  };
}

function normalizeShop(shop) {
  if (!shop) {
    return null;
  }

  const ownerName =
    shop.owner?.fullName ||
    [shop.owner?.firstName, shop.owner?.lastName].filter(Boolean).join(" ").trim();

  return {
    id: shop._id,
    name: shop.name,
    category: shop.category,
    city: shop.address?.city || shop.city || "",
    status: shop.status,
    owner: {
      id: shop.owner?._id,
      name: ownerName || shop.owner?.name || "",
      email: shop.owner?.email,
      phone: shop.owner?.phone || shop.owner?.mobile,
    },
    logo: shop.logo || shop.images?.logo || shop.images?.gallery?.[0] || "",
    createdAt: shop.createdAt,
  };
}

const LAST_N_DAYS = 7;

export async function getDashboard() {
  const [usersCount, shopsCount, ordersCount, revenue, pendingShops, topShops, revenueByDay] =
    await Promise.all([
      repository.countUsers(),
      repository.countShops(),
      repository.countOrders(),
      repository.sumRevenue(),
      repository.listPendingShops(10),
      repository.getTopShops(5),
      repository.getRevenueByDay(LAST_N_DAYS),
    ]);

  return {
    stats: {
      users: usersCount,
      shops: shopsCount,
      orders: ordersCount,
      revenue,
    },
    analytics: {
      revenueByDay,
      topShops,
    },
    pendingShops: pendingShops.map(normalizeShop),
  };
}

export async function getShops(filters, paging) {
  const { status, search } = filters;
  const data = await repository.listShops({ status, search }, paging);

  return {
    ...data,
    shops: data.shops.map(normalizeShop),
  };
}

export async function getShopById(id) {
  const shop = await repository.getShopById(id);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  return normalizeShop(shop);
}

export async function updateShopStatus(id, status, adminId) {
  const shop = await repository.updateShopStatus(id, status, adminId);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  return normalizeShop(shop);
}

export async function deleteShop(id) {
  const shop = await repository.deleteShop(id);

  if (!shop) {
    throw new Error("Shop not found.");
  }

  return true;
}

export async function getUsers(filters, paging) {
  const { status, role, search } = filters;
  const data = await repository.listUsers({ status, role, search }, paging);

  return {
    ...data,
    users: data.users.map(normalizeUser),
  };
}

function normalizeOrder(order) {
  if (!order) { return null; }

  return {
    id: order._id,
    orderNumber: order.orderNumber,
    customer: order.customer
      ? {
          id: order.customer._id,
          name: order.customer.fullName || order.customer.email || "",
          mobile: order.customer.mobile,
        }
      : null,
    shop: order.shop
      ? {
          id: order.shop._id,
          name: order.shop.name,
        }
      : null,
    totalAmount: order.totalAmount,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt,
  };
}

function normalizePayment(payment) {
  if (!payment) { return null; }

  return {
    id: payment._id,
    orderId: payment.order?._id || payment.order,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method,
    provider: payment.provider,
    providerTransactionId: payment.providerTransactionId,
    status: payment.status,
    createdAt: payment.createdAt,
  };
}

export async function getProducts(filters, paging) {
  const { status, search } = filters;
  const data = await repository.listProducts({ status, search }, paging);

  return {
    ...data,
    products: data.products.map(normalizeProduct),
  };
}

export async function getOrders(filters, paging) {
  const { status, search } = filters;
  const data = await repository.listOrders({ status, search }, paging);

  return {
    ...data,
    orders: data.orders.map(normalizeOrder),
  };
}

export async function getPayments(filters, paging) {
  const { status, search } = filters;
  const data = await repository.listPayments({ status, search }, paging);

  return {
    ...data,
    payments: data.payments.map(normalizePayment),
  };
}

export async function updatePaymentStatus(id, status) {
  const payment = await repository.updatePaymentStatus(id, status);

  if (!payment) {
    throw new Error("Payment not found.");
  }

  return normalizePayment(payment);
}

function normalizeProduct(product) {
  if (!product) {
    return null;
  }

  return {
    id: product._id,
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: product.price,
    discountedPrice: product.discountedPrice,
    status: product.status,
    shop: product.shop
      ? {
          id: product.shop._id,
          name: product.shop.name,
          slug: product.shop.slug,
        }
      : null,
    owner: product.owner
      ? {
          id: product.owner._id,
          name: product.owner.fullName || `${product.owner.firstName || ""} ${product.owner.lastName || ""}`.trim(),
          email: product.owner.email,
        }
      : null,
    createdAt: product.createdAt,
  };
}

export async function getUserById(id) {
  const user = await repository.getUserById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  return normalizeUser(user);
}

export async function updateUserStatus(id, status) {
  const user = await repository.updateUserStatus(id, status);

  if (!user) {
    throw new Error("User not found.");
  }

  return normalizeUser(user);
}

export async function verifyUser(id) {
  const user = await repository.verifyUser(id);

  if (!user) {
    throw new Error("User not found.");
  }

  return normalizeUser(user);
}
