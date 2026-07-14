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

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/notifications", notificationRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/moments", momentRoutes);
router.use("/wallet", walletRoutes);
router.use("/rewards", rewardRoutes);
router.use("/promotions", promotionRoutes);
router.use("/uploads", uploadRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Mahii API is running",
  });
});

export default router;
