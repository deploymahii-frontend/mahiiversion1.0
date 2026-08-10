import User from "../auth/models/user.model.js";
import Shop from "../shops/shop.model.js";
import Order from "../orders/order.model.js";
import Payment from "../payment/payment.model.js";
import Product from "../products/product.model.js";
import { ORDER_STATUS } from "../orders/order.constants.js";

const toObjectId = (id) => id;

export async function countUsers() {
  try {
    return await User.countDocuments();
  } catch {
    return 0;
  }
}

export async function countShops() {
  try {
    return await Shop.countDocuments();
  } catch {
    return 0;
  }
}

export async function countOrders() {
  try {
    return await Order.countDocuments();
  } catch {
    return 0;
  }
}

export async function sumRevenue() {
  try {
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
  } catch {
    return 0;
  }
}

export async function listPendingShops(limit = 10) {
  try {
    return await Shop.find({ status: "PENDING" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("owner", "fullName firstName lastName email phone mobile")
      .lean();
  } catch {
    return [];
  }
}

export async function getTopShops(limit = 5) {
  try {
    return await Order.aggregate([
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
  } catch {
    return [];
  }
}

export async function getRevenueByDay(days = 7) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (days - 1));

  try {
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
  } catch {
    return [];
  }
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

  try {
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
  } catch {
    return {
      shops: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

export async function listProducts(filter = {}, paging = {}) {
  const status = filter.status ? filter.status.toUpperCase() : undefined;
  const search = filter.search ? new RegExp(filter.search, "i") : undefined;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: search },
      { slug: search },
      { category: search },
    ];
  }

  const page = Number(paging.page) || 1;
  const limit = Number(paging.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("shop", "name slug")
        .populate("owner", "fullName firstName lastName email")
        .lean(),
      Product.countDocuments(query),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch {
    return {
      products: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

export async function listOrders(filter = {}, paging = {}) {
  const status = filter.status ? filter.status.toUpperCase() : undefined;
  const search = filter.search ? new RegExp(filter.search, "i") : undefined;

  const query = {};
  const conditions = [];

  if (status) {
    conditions.push({
      $or: [
        { orderStatus: status },
        { paymentStatus: status },
      ],
    });
  }

  if (search) {
    conditions.push({
      $or: [
        { orderNumber: search },
        { "deliveryAddress.fullName": search },
        { "deliveryAddress.mobile": search },
      ],
    });
  }

  if (conditions.length) {
    query.$and = conditions;
  }

  const page = Number(paging.page) || 1;
  const limit = Number(paging.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("customer", "fullName email mobile")
        .populate("shop", "name")
        .lean(),
      Order.countDocuments(query),
    ]);

    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch {
    return {
      orders: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

export async function listPayments(filter = {}, paging = {}) {
  const status = filter.status ? filter.status.toUpperCase() : undefined;
  const search = filter.search ? new RegExp(filter.search, "i") : undefined;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { providerTransactionId: search },
      { provider: search },
      { method: search },
    ];
  }

  const page = Number(paging.page) || 1;
  const limit = Number(paging.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const [payments, total] = await Promise.all([
      Payment.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("order", "orderNumber")
        .populate("customer", "fullName email mobile")
        .lean(),
      Payment.countDocuments(query),
    ]);

    return {
      payments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch {
    return {
      payments: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

export async function updatePaymentStatus(id, status) {
  try {
    return await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("order", "orderNumber")
      .populate("customer", "fullName email mobile")
      .lean();
  } catch {
    return null;
  }
}

export async function getShopById(id) {
  try {
    return await Shop.findById(id)
      .populate("owner", "fullName firstName lastName email phone mobile")
      .lean();
  } catch {
    return null;
  }
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

  try {
    return await Shop.findByIdAndUpdate(id, update, { new: true })
      .populate("owner", "fullName firstName lastName email phone mobile")
      .lean();
  } catch {
    return null;
  }
}

export async function deleteShop(id) {
  try {
    return await Shop.findByIdAndDelete(id).lean();
  } catch {
    return null;
  }
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

  try {
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
  } catch {
    return {
      users: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}

export async function getUserById(id) {
  try {
    return await User.findById(id).lean();
  } catch {
    return null;
  }
}

export async function updateUserStatus(id, status) {
  try {
    return await User.findByIdAndUpdate(
      id,
      { accountStatus: status.toLowerCase() },
      { new: true }
    ).lean();
  } catch {
    return null;
  }
}

export async function verifyUser(id) {
  try {
    return await User.findByIdAndUpdate(
      id,
      {
        emailVerified: true,
        accountStatus: "active",
      },
      { new: true }
    ).lean();
  } catch {
    return null;
  }
}
