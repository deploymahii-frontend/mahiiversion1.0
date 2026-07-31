import customerService from "../services/customer.service.js";

export class CustomerController {
  async getProfile(req, res, next) {
    try {
      const userId = req.user._id || req.user.id;
      const customer = await customerService.getProfile(userId);

      return res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user._id || req.user.id;
      const customer = await customerService.updateProfile(userId, req.body);

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDashboard(req, res, next) {
    try {
      const dashboardData = await customerService.getDashboardData(req.user);

      return res.status(200).json({
        success: true,
        message: "Dashboard fetched successfully",
        data: dashboardData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();
