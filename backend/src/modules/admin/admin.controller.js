import * as adminService from "./admin.service.js";
import { successResponse } from "../../utils/api-response.js";

export async function getDashboard(req, res, next) {
  try {
    const data = await adminService.getDashboard();
    return successResponse(res, data, "Admin dashboard data fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getShops(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;
    const search = req.query.search;

    const data = await adminService.getShops({ status, search }, { page, limit });

    return successResponse(res, data, "Shops fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getShopById(req, res, next) {
  try {
    const shop = await adminService.getShopById(req.params.id);

    return successResponse(res, shop, "Shop details fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function updateShopStatus(req, res, next) {
  try {
    const status = req.body.status;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    const shop = await adminService.updateShopStatus(
      req.params.id,
      status,
      req.user?._id
    );

    return successResponse(res, shop, "Shop status updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteShop(req, res, next) {
  try {
    await adminService.deleteShop(req.params.id);

    return successResponse(res, null, "Shop deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;
    const role = req.query.role;
    const search = req.query.search;

    const data = await adminService.getUsers(
      { status, role, search },
      { page, limit }
    );

    return successResponse(res, data, "Users fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getProducts(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;
    const search = req.query.search;

    const data = await adminService.getProducts(
      { status, search },
      { page, limit }
    );

    return successResponse(res, data, "Products fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;
    const search = req.query.search;

    const data = await adminService.getOrders(
      { status, search },
      { page, limit }
    );

    return successResponse(res, data, "Orders fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getPayments(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;
    const search = req.query.search;

    const data = await adminService.getPayments(
      { status, search },
      { page, limit }
    );

    return successResponse(res, data, "Payments fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function updatePaymentStatus(req, res, next) {
  try {
    const status = req.body.status;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const data = await adminService.updatePaymentStatus(req.params.id, status);
    return successResponse(res, data, "Payment status updated successfully");
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await adminService.getUserById(req.params.id);

    return successResponse(res, user, "User details fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function activateUser(req, res, next) {
  try {
    const user = await adminService.updateUserStatus(req.params.id, "ACTIVE");

    return successResponse(res, user, "User activated successfully");
  } catch (error) {
    next(error);
  }
}

export async function suspendUser(req, res, next) {
  try {
    const user = await adminService.updateUserStatus(req.params.id, "SUSPENDED");

    return successResponse(res, user, "User suspended successfully");
  } catch (error) {
    next(error);
  }
}

export async function verifyUser(req, res, next) {
  try {
    const user = await adminService.verifyUser(req.params.id);

    return successResponse(res, user, "User verified successfully");
  } catch (error) {
    next(error);
  }
}
