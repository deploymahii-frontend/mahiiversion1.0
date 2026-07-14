import * as dashboardService from "./dashboard.service.js";
import { successResponse } from "../../utils/api-response.js";

export async function getShopOverview(req, res, next) {
  try {
    const data = await dashboardService.getShopOverview(req.user._id);

    return successResponse(res, data, "Shop overview fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getSalesAnalytics(req, res, next) {
  try {
    const data = await dashboardService.getSalesAnalytics(req.user._id);

    return successResponse(res, data, "Sales analytics fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getPopularProducts(req, res, next) {
  try {
    const data = await dashboardService.getPopularProducts(req.user._id);

    return successResponse(res, data, "Popular products fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getCustomerInsights(req, res, next) {
  try {
    const data = await dashboardService.getCustomerInsights(req.user._id);

    return successResponse(res, data, "Customer insights fetched successfully");
  } catch (error) {
    next(error);
  }
}
