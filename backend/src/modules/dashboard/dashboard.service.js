import Shop from "../shops/shop.model.js";
import Order from "../orders/order.model.js";
import Wishlist from "../wishlist/wishlist.model.js";

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfWeek() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function startOfMonth() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function thirtyDaysAgo() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  date.setHours(0, 0, 0, 0);
  return date;
}

export async function getShopOverview(ownerId) {
  const shop = await Shop.findOne({ owner: ownerId });

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const today = startOfToday();
  const todayOrders = await Order.countDocuments({
    shop: shop._id,
    createdAt: { $gte: today },
  });

  const wishlistCount = await Wishlist.countDocuments({ shop: shop._id });

  return {
    shopName: shop.name,
    todayOrders,
    totalOrders: shop.totalOrders,
    rating: shop.rating,
    totalReviews: shop.totalReviews,
    totalViews: shop.totalViews,
    wishlistCount,
  };
}

export async function getSalesAnalytics(ownerId) {
  const shop = await Shop.findOne({ owner: ownerId });

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const now = new Date();
  const today = startOfToday();
  const week = startOfWeek();
  const month = startOfMonth();

  const [todayResult, weekResult, monthResult] = await Promise.all([
    Order.aggregate([
      { $match: { shop: shop._id, createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    Order.aggregate([
      { $match: { shop: shop._id, createdAt: { $gte: week } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    Order.aggregate([
      { $match: { shop: shop._id, createdAt: { $gte: month } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  return {
    today: todayResult[0]?.total || 0,
    week: weekResult[0]?.total || 0,
    month: monthResult[0]?.total || 0,
  };
}

export async function getPopularProducts(ownerId) {
  const shop = await Shop.findOne({ owner: ownerId });

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const products = await Order.aggregate([
    { $match: { shop: shop._id } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        name: { $first: "$items.name" },
        orders: { $sum: "$items.quantity" },
      },
    },
    { $sort: { orders: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, name: 1, orders: 1 } },
  ]);

  return products;
}

export async function getCustomerInsights(ownerId) {
  const shop = await Shop.findOne({ owner: ownerId });

  if (!shop) {
    throw new Error("Shop not found.");
  }

  const recentThreshold = thirtyDaysAgo();

  const customers = await Order.aggregate([
    { $match: { shop: shop._id } },
    {
      $group: {
        _id: "$customer",
        orders: { $sum: 1 },
        firstOrderAt: { $min: "$createdAt" },
      },
    },
  ]);

  const newCustomers = customers.filter(
    (customer) => customer.firstOrderAt >= recentThreshold
  ).length;

  const repeatCustomers = customers.filter((customer) => customer.orders > 1)
    .length;

  const topAreasResult = await Order.aggregate([
    {
      $match: {
        shop: shop._id,
        $or: [
          { "deliveryAddress.area": { $exists: true, $ne: "" } },
          { "deliveryAddress.city": { $exists: true, $ne: "" } },
        ],
      },
    },
    {
      $project: {
        area: {
          $cond: [
            { $and: [
              { $ifNull: ["$deliveryAddress.area", false] },
              { $ne: ["$deliveryAddress.area", ""] },
            ] },
            "$deliveryAddress.area",
            "$deliveryAddress.city",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$area",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $project: { _id: 0, area: "$_id" } },
  ]);

  return {
    newCustomers,
    repeatCustomers,
    topAreas: topAreasResult.map((item) => item.area),
  };
}
