import dashboardRepository from "./dashboard.repository.js";

const getOverview = async () => {
  return await dashboardRepository.getOverview();
};

const getStats = async () => {
  const stats = await dashboardRepository.getStats();
  return {
    users: stats.users || 0,
    shops: stats.shops || 0,
    ordersToday: stats.ordersToday || 0,
    revenue: stats.revenue || 0,
    userGrowth: stats.userGrowth || "0%",
    shopGrowth: stats.shopGrowth || "0%",
    orderGrowth: stats.orderGrowth || "0%",
    revenueGrowth: stats.revenueGrowth || "0%"
  };
};

const getRevenue = async (query) => {
  const period = query.period || "monthly";
  return await dashboardRepository.getRevenue(period);
};

const getRecentOrders = async (query) => {
  const limit = Number(query.limit) || 5;
  return await dashboardRepository.getRecentOrders(limit);
};

const getTopShops = async (query) => {
  const limit = Number(query.limit) || 5;
  return await dashboardRepository.getTopShops(limit);
};

const getPendingActions = async () => {
  return await dashboardRepository.getPendingActions();
};

export default { getOverview, getStats, getRevenue, getRecentOrders, getTopShops, getPendingActions };