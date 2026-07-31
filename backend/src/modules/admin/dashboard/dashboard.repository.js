import mongoose from "mongoose";
import OrderModel from "../../orders/order.model.js";
import ShopModel from "../../shops/shop.model.js";
import UserModel from "../../users/user.model.js";

const getOverview = async () => {
  const [users, shops, ordersToday, revenueData] = await Promise.all([
    UserModel.countDocuments(),
    ShopModel.countDocuments(),
    OrderModel.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }),
    OrderModel.aggregate([ { $match: { paymentStatus: "PAID" } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } } ])
  ]);
  const revenue = revenueData.length > 0 ? revenueData[0].total : 0;
  return { users, shops, ordersToday, revenue };
};

const getStats = async () => {
  const [users, shops, ordersToday, revenueData] = await Promise.all([
    UserModel.countDocuments(),
    ShopModel.countDocuments(),
    OrderModel.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) } }),
    OrderModel.aggregate([ { $match: { paymentStatus: "PAID" } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } } ])
  ]);
  return { users, shops, ordersToday, revenue: revenueData[0]?.total || 0 };
};

const getRevenue = async (period) => {
  const currentYear = new Date().getFullYear();
  const revenue = await OrderModel.aggregate([
    { $match: { paymentStatus: "PAID", createdAt: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) } } },
    { $group: { _id: { $month: "$createdAt" }, revenue: { $sum: "$totalAmount" } } },
    { $sort: { _id: 1 } }
  ]);
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedData = revenue.map(item => ({
    month: months[item._id - 1],
    revenue: item.revenue
  }));
  
  for (let i = 0; i < new Date().getMonth() + 1; i++) {
    if (!formattedData.find(d => d.month === months[i])) {
      formattedData.push({ month: months[i], revenue: 0 });
    }
  }
  return formattedData.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
};

const getRecentOrders = async (limit) => {
  return await OrderModel.find()
    .populate("customer", "name")
    .populate("shop", "name")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

const getTopShops = async (limit) => {
  return await OrderModel.aggregate([
    { $match: { paymentStatus: "PAID" } },
    { $group: { _id: "$shop", revenue: { $sum: "$totalAmount" }, orders: { $sum: 1 } } },
    { $sort: { revenue: -1 } },
    { $limit: limit },
    { $lookup: { from: "shops", localField: "_id", foreignField: "_id", as: "shopDetails" } },
    { $unwind: "$shopDetails" },
    { $project: { _id: "$_id", name: "$shopDetails.name", category: "$shopDetails.category", rating: "$shopDetails.rating", revenue: 1, orders: 1 } }
  ]);
};

const getPendingActions = async () => {
  const pendingShops = await ShopModel.countDocuments({ status: "PENDING" });
  const pendingUsers = await UserModel.countDocuments({ status: "PENDING" });
  
  const actions = [];
  if (pendingShops > 0) actions.push({ title: `${pendingShops} shop approvals pending` });
  if (pendingUsers > 0) actions.push({ title: `${pendingUsers} user approvals pending` });
  if (actions.length === 0) actions.push({ title: "No pending actions at this time." });
  
  return actions;
};

export default { getOverview, getStats, getRevenue, getRecentOrders, getTopShops, getPendingActions };