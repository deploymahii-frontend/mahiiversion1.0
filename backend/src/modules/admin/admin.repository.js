import User from "../auth/models/user.model.js";
import Shop from "../shops/shop.model.js";
import Order from "../orders/order.model.js";
import { ORDER_STATUS } from "../orders/order.constants.js";

const toObjectId = (id) => id;

export async function countUsers() {
  return User.countDocuments();
}

export async function countShops() {
  return Shop.countDocuments();
}

export async function countOrders() {
  return Order.countDocuments();
}

export async function sumRevenue() {
  const result = await Order.aggregate([
    {
      $match: {
        orderStatus: ORDER_STATUS.COMPLETED,
      },
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  return result[0]?.revenue || 0;
}

export async function listPendingShops(limit = 10) {
  return Shop.find({ status: "PENDING" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("owner", "fullName firstName lastName email phone mobile")
    .lean();
}

export async function getTopShops(limit = 5) {
  return Order.aggregate([
    {
      $match: {
        orderStatus: ORDER_STATUS.COMPLETED,
      },
    },
    {
      $group: {
        _id: "$shop",
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
    {
      $sort: { revenue: -1 },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "shops",
        localField: "_id",
        foreignField: "_id",
        as: "shop",
      },
    },
    {
      $unwind: {
        path: "$shop",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        shopId: "$_id",
        name: "$shop.name",
        category: "$shop.category",
        city: "$shop.address.city",
        status: "$shop.status",
        revenue: 1,
        orders: 1,
      },
    },
  ]);
}

export async function getRevenueByDay(days = 7) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (days - 1));

  const results = await Order.aggregate([
    {
      $match: {
        orderStatus: ORDER_STATUS.COMPLETED,
        createdAt: { $gte: date },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        total: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return results.map((item) => ({
    date: item._id,
    total: item.total,
  }));
}

export async function listShops(filter = {}, paging = {}) {
  const status = filter.status ? filter.status.toUpperCase() : undefined;
  const search = filter.search ? new RegExp(filter.search, "i") : undefined;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: search },
      { category: search },
      { "address.city": search },
    ];
  }

  const page = Number(paging.page) || 1;
  const limit = Number(paging.limit) || 20;
  const skip = (page - 1) * limit;

  const [shops, total] = await Promise.all([
    Shop.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner", "fullName firstName lastName email phone mobile")
      .lean(),
    Shop.countDocuments(query),
  ]);

  return {
    shops,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getShopById(id) {
  return Shop.findById(id)
    .populate("owner", "fullName firstName lastName email phone mobile")
    .lean();
}

export async function updateShopStatus(id, status, adminId) {
  const update = { status };

  if (status === "APPROVED") {
    update.isVerified = true;
    update["verification.verifiedAt"] = new Date();
    if (adminId) {
      update["verification.verifiedBy"] = toObjectId(adminId);
    }
  }

  if (status === "REJECTED") {
    update.isVerified = false;
  }

  return Shop.findByIdAndUpdate(id, update, { new: true })
    .populate("owner", "fullName firstName lastName email phone mobile")
    .lean();
}

export async function deleteShop(id) {
  return Shop.findByIdAndDelete(id).lean();
}

export async function listUsers(filter = {}, paging = {}) {
  const status = filter.status ? filter.status.toLowerCase() : undefined;
  const role = filter.role ? filter.role.toLowerCase() : undefined;
  const search = filter.search ? new RegExp(filter.search, "i") : undefined;

  const query = {};

  if (status) {
    query.accountStatus = status;
  }

  if (role) {
    query.role = role;
  }

  if (search) {
    query.$or = [
      { fullName: search },
      { email: search },
      { phone: search },
    ];
  }

  const page = Number(paging.page) || 1;
  const limit = Number(paging.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(query),
  ]);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getUserById(id) {
  return User.findById(id).lean();
}

export async function updateUserStatus(id, status) {
  return User.findByIdAndUpdate(
    id,
    { accountStatus: status.toLowerCase() },
    { new: true }
  ).lean();
}

export async function verifyUser(id) {
  return User.findByIdAndUpdate(
    id,
    {
      emailVerified: true,
      accountStatus: "active",
    },
    { new: true }
  ).lean();
}
