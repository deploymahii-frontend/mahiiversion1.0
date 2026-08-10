import shopOwnerService from "./shopOwner.service.js";

export class ShopOwnerController {

  /* ── Dashboard ────────────────────────────── */
  getDashboard = async (req, res, next) => {
    try {
      const data = await shopOwnerService.getDashboard(req.user._id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  /* ── Shop Profile ─────────────────────────── */
  getShopProfile = async (req, res, next) => {
    try {
      const shop = await shopOwnerService.getShopProfile(req.user._id);
      res.json({ success: true, data: shop });
    } catch (err) { next(err); }
  };

  updateShopProfile = async (req, res, next) => {
    try {
      const shop = await shopOwnerService.updateShopProfile(req.user._id, req.body);
      res.json({ success: true, message: "Shop updated successfully", data: shop });
    } catch (err) { next(err); }
  };

  toggleShopStatus = async (req, res, next) => {
    try {
      const { isOpen } = req.body;
      const shop = await shopOwnerService.toggleShopStatus(req.user._id, Boolean(isOpen));
      res.json({ success: true, message: `Shop is now ${isOpen ? "open" : "closed"}`, data: shop });
    } catch (err) { next(err); }
  };

  /* ── Orders ───────────────────────────────── */
  getOrders = async (req, res, next) => {
    try {
      const orders = await shopOwnerService.getOrders(req.user._id, req.query);
      res.json({ success: true, data: orders });
    } catch (err) { next(err); }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      const order = await shopOwnerService.updateOrderStatus(
        req.user._id,
        req.params.orderId,
        req.body.status
      );
      res.json({ success: true, message: "Order status updated", data: order });
    } catch (err) { next(err); }
  };

  /* ── Products ─────────────────────────────── */
  getProducts = async (req, res, next) => {
    try {
      const products = await shopOwnerService.getProducts(req.user._id);
      res.json({ success: true, data: products });
    } catch (err) { next(err); }
  };

  createProduct = async (req, res, next) => {
    try {
      const product = await shopOwnerService.createProduct(req.user._id, req.body);
      res.status(201).json({ success: true, message: "Product created", data: product });
    } catch (err) { next(err); }
  };

  updateProduct = async (req, res, next) => {
    try {
      const product = await shopOwnerService.updateProduct(
        req.user._id,
        req.params.productId,
        req.body
      );
      res.json({ success: true, message: "Product updated", data: product });
    } catch (err) { next(err); }
  };

  deleteProduct = async (req, res, next) => {
    try {
      await shopOwnerService.deleteProduct(req.user._id, req.params.productId);
      res.json({ success: true, message: "Product deleted" });
    } catch (err) { next(err); }
  };

  updateStock = async (req, res, next) => {
    try {
      const product = await shopOwnerService.updateStock(
        req.user._id,
        req.params.productId,
        req.body.quantity
      );
      res.json({ success: true, message: "Stock updated", data: product });
    } catch (err) { next(err); }
  };

  toggleAvailability = async (req, res, next) => {
    try {
      const product = await shopOwnerService.toggleAvailability(
        req.user._id,
        req.params.productId,
        req.body.available
      );
      res.json({ success: true, message: "Availability updated", data: product });
    } catch (err) { next(err); }
  };

  /* ── Analytics ────────────────────────────── */
  getAnalytics = async (req, res, next) => {
    try {
      const days = parseInt(req.query.days) || 30;
      const data = await shopOwnerService.getAnalytics(req.user._id, days);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  };

  /* ── Reviews ──────────────────────────────── */
  getReviews = async (req, res, next) => {
    try {
      const data = await shopOwnerService.getReviews(req.user._id);
      res.json({ success: true, ...data });
    } catch (err) { next(err); }
  };

  replyToReview = async (req, res, next) => {
    try {
      const review = await shopOwnerService.replyToReview(
        req.user._id,
        req.params.reviewId,
        req.body.reply
      );
      res.json({ success: true, message: "Reply sent", data: review });
    } catch (err) { next(err); }
  };
}

export default new ShopOwnerController();
