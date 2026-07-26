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
