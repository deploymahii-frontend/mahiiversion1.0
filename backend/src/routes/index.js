import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import shopRoutes from "../modules/shops/shop.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import cartRoutes from "../modules/carts/cart.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import wishlistRoutes from "../modules/wishlist/wishlist.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import momentRoutes from "../modules/moments/moment.routes.js";
import walletRoutes from "../modules/wallets/wallet.routes.js";
import rewardRoutes from "../modules/rewards/reward.routes.js";
import promotionRoutes from "../modules/promotions/promotion.routes.js";
import uploadRoutes from "../modules/uploads/upload.routes.js";
import offerRoutes from "../modules/offers/offer.routes.js";
import recommendationRoutes from "../modules/recommendation/recommendation.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";
import homeRoutes from "../modules/home/home.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import deliveryRoutes from "../modules/delivery/delivery.routes.js";
import employeeRoutes from "../modules/hr/employees/employee.routes.js";
import attendanceRoutes from "../modules/hr/attendance/attendance.routes.js";
import leaveRoutes from "../modules/hr/leave/leave.routes.js";
import payrollRoutes from "../modules/hr/payroll/payroll.routes.js";
import salaryStructureRoutes from "../modules/hr/payroll/salary-structure.routes.js";
import warehouseRoutes from "../modules/inventory/warehouse/warehouse.routes.js";
import customerRoutes from "../modules/customers/customer.routes.js";
import customerModuleRoutes from "../modules/customer/index.js";
import inventoryAnalyticsRoutes from "../modules/inventory/inventory.routes.js";
import shopOwnerRoutes from "../modules/shopOwner/shopOwner.routes.js";
import subscriptionRoutes from "../modules/subscriptions/subscription.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/customer", customerModuleRoutes);
router.use("/inventory", inventoryAnalyticsRoutes);
router.use("/shop", shopOwnerRoutes);
router.use("/categories", categoryRoutes);
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/notifications", notificationRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/moments", momentRoutes);
router.use("/wallet", walletRoutes);
router.use("/rewards", rewardRoutes);
router.use("/promotions", promotionRoutes);
router.use("/uploads", uploadRoutes);
router.use("/offers", offerRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/home", homeRoutes);
router.use("/payment", paymentRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/employees", employeeRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
router.use("/payroll", payrollRoutes);
router.use("/salary-structures", salaryStructureRoutes);
router.use("/warehouse", warehouseRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Mahii API is running",
  });
});

export default router;
