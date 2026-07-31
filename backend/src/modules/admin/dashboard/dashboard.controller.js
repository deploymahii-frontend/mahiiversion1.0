import dashboardService from "./dashboard.service.js";
import { validateRevenueQuery, validateListQuery } from "./dashboard.validation.js";

const getOverview = async (req, res, next) => {
  try {
    const data = await dashboardService.getOverview();
    res.status(200).json({ success: true, message: "Dashboard overview fetched successfully", data });
  } catch (error) { next(error); }
};

const getStats = async (req, res, next) => {
  try {
    const data = await dashboardService.getStats();
    res.status(200).json({ success: true, message: "Dashboard statistics fetched successfully", data });
  } catch (error) { next(error); }
};

const getRevenue = async (req, res, next) => {
  try {
    const { error, value } = validateRevenueQuery(req.query);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const data = await dashboardService.getRevenue(value);
    res.status(200).json({ success: true, message: "Revenue analytics fetched successfully", data });
  } catch (error) { next(error); }
};

const getRecentOrders = async (req, res, next) => {
  try {
    const { error, value } = validateListQuery(req.query);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const data = await dashboardService.getRecentOrders(value);
    res.status(200).json({ success: true, message: "Recent orders fetched successfully", data });
  } catch (error) { next(error); }
};

const getTopShops = async (req, res, next) => {
  try {
    const { error, value } = validateListQuery(req.query);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const data = await dashboardService.getTopShops(value);
    res.status(200).json({ success: true, message: "Top shops fetched successfully", data });
  } catch (error) { next(error); }
};

const getPendingActions = async (req, res, next) => {
  try {
    const data = await dashboardService.getPendingActions();
    res.status(200).json({ success: true, message: "Pending actions fetched successfully", data });
  } catch (error) { next(error); }
};

export default { getOverview, getStats, getRevenue, getRecentOrders, getTopShops, getPendingActions };