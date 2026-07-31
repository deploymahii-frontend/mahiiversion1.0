import { Router } from "express";
import ctrl from "./shopOwner.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

// All routes require authentication
router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Dashboard
| GET /api/v1/shop/dashboard
|--------------------------------------------------------------------------
*/
router.get("/dashboard", ctrl.getDashboard);

/*
|--------------------------------------------------------------------------
| Shop Profile
| GET    /api/v1/shop/profile
| PUT    /api/v1/shop/profile
| PATCH  /api/v1/shop/status
|--------------------------------------------------------------------------
*/
router.get("/profile", ctrl.getShopProfile);
router.put("/profile", ctrl.updateShopProfile);
router.patch("/status", ctrl.toggleShopStatus);

/*
|--------------------------------------------------------------------------
| Orders
| GET   /api/v1/shop/orders
| PATCH /api/v1/shop/orders/:orderId/status
|--------------------------------------------------------------------------
*/
router.get("/orders", ctrl.getOrders);
router.patch("/orders/:orderId/status", ctrl.updateOrderStatus);

/*
|--------------------------------------------------------------------------
| Products
| GET    /api/v1/shop/products
| POST   /api/v1/shop/products
| PUT    /api/v1/shop/products/:productId
| DELETE /api/v1/shop/products/:productId
| PATCH  /api/v1/shop/products/:productId/stock
| PATCH  /api/v1/shop/products/:productId/availability
|--------------------------------------------------------------------------
*/
router.get("/products", ctrl.getProducts);
router.post("/products", ctrl.createProduct);
router.put("/products/:productId", ctrl.updateProduct);
router.delete("/products/:productId", ctrl.deleteProduct);
router.patch("/products/:productId/stock", ctrl.updateStock);
router.patch("/products/:productId/availability", ctrl.toggleAvailability);

/*
|--------------------------------------------------------------------------
| Analytics
| GET /api/v1/shop/analytics?days=30
|--------------------------------------------------------------------------
*/
router.get("/analytics", ctrl.getAnalytics);

/*
|--------------------------------------------------------------------------
| Reviews
| GET   /api/v1/shop/reviews
| PATCH /api/v1/shop/reviews/:reviewId/reply
|--------------------------------------------------------------------------
*/
router.get("/reviews", ctrl.getReviews);
router.patch("/reviews/:reviewId/reply", ctrl.replyToReview);

export default router;
