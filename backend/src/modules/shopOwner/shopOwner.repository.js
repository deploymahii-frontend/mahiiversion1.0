import mongoose from "mongoose";
import Shop from "../shops/shop.model.js";
import Order from "../orders/order.model.js";
import Product from "../products/product.model.js";
import Review from "../reviews/review.model.js";

export class ShopOwnerRepository {
  /* ── Shop Profile ─────────────────────────── */
  async findShopByOwner(ownerId) {
    return Shop.findOne({ owner: ownerId }).lean();
  }

  async updateShop(ownerId, data) {
    return Shop.findOneAndUpdate({ owner: ownerId }, data, { new: true });
  }

  /* ── Dashboard Aggregation ────────────────── */
  async getDashboardStats(shopId) {
    const sid = new mongoose.Types.ObjectId(shopId);

    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      revenueAgg,
      todayOrdersAgg,
      totalProducts,
      lowStockProducts,
      ratingAgg,
    ] = await Promise.all([
      Order.countDocuments({ shop: sid, isDeleted: false }),

      Order.countDocuments({
        shop: sid,
        orderStatus: { $in: ["PLACED", "ACCEPTED", "PREPARING"] },
        isDeleted: false,
      }),

      Order.countDocuments({ shop: sid, orderStatus: "DELIVERED" }),

      Order.aggregate([
        { $match: { shop: sid, orderStatus: "DELIVERED", isDeleted: false } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),

      Order.aggregate([
        {
          $match: {
            shop: sid,
            isDeleted: false,
            createdAt: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            revenue: { $sum: "$totalAmount" },
          },
        },
      ]),

      Product.countDocuments({ shop: sid }),

      Product.countDocuments({
        shop: sid,
        "inventory.quantity": { $lte: 5 },
        "inventory.trackInventory": true,
      }),

      Review
        ? Review.aggregate([
            { $match: { shop: sid } },
            { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
          ])
        : Promise.resolve([]),
    ]);

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: revenueAgg[0]?.total || 0,
      todayOrders: todayOrdersAgg[0]?.count || 0,
      todayRevenue: todayOrdersAgg[0]?.revenue || 0,
      totalProducts,
      lowStockProducts,
      rating: ratingAgg[0]?.avg ? +ratingAgg[0].avg.toFixed(1) : 0,
      totalReviews: ratingAgg[0]?.count || 0,
    };
  }

  /* ── Orders ───────────────────────────────── */
  async getShopOrders(shopId, { status, page = 1, limit = 20 } = {}) {
    const filter = { shop: shopId, isDeleted: false };
    if (status) filter.orderStatus = status;

    return Order.find(filter)
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  async findOrderById(orderId) {
    return Order.findById(orderId)
      .populate("customer", "name email phone")
      .lean();
  }

  async findProductById(productId) {
    return Product.findById(productId).lean();
  }

  async findReviewById(reviewId) {
    return Review.findById(reviewId).lean();
  }

  async updateOrderStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );
  }

  /* ── Products ─────────────────────────────── */
  async getShopProducts(shopId) {
    return Product.find({ shop: shopId }).sort({ createdAt: -1 }).lean();
  }

  async createProduct(data) {
    return Product.create(data);
  }

  async updateProduct(productId, data) {
    return Product.findByIdAndUpdate(productId, data, { new: true });
  }

  async deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
  }

  async updateProductStock(productId, quantity) {
    return Product.findByIdAndUpdate(
      productId,
      { "inventory.quantity": quantity },
      { new: true }
    );
  }

  async toggleProductAvailability(productId, available) {
    return Product.findByIdAndUpdate(
      productId,
      { available },
      { new: true }
    );
  }

  /* ── Analytics ────────────────────────────── */
  async getRevenueAnalytics(shopId, days = 30) {
    const sid = new mongoose.Types.ObjectId(shopId);
    const from = new Date();
    from.setDate(from.getDate() - days);

    return Order.aggregate([
      {
        $match: {
          shop: sid,
          orderStatus: "DELIVERED",
          isDeleted: false,
          createdAt: { $gte: from },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getTopProducts(shopId, limit = 10) {
    const sid = new mongoose.Types.ObjectId(shopId);
    return Order.aggregate([
      { $match: { shop: sid, isDeleted: false } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.name" },
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.total" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: limit },
    ]);
  }

  /* ── Reviews ──────────────────────────────── */
  async getShopReviews(shopId) {
    try {
      if (!mongoose.models.Review) return [];
      return mongoose.models.Review.find({ shop: shopId })
        .populate("customer", "name avatar")
        .sort({ createdAt: -1 })
        .lean();
    } catch {
      return [];
    }
  }

  async replyToReview(reviewId, reply) {
    try {
      if (!mongoose.models.Review) return null;
      return mongoose.models.Review.findByIdAndUpdate(
        reviewId,
        { ownerReply: reply, ownerRepliedAt: new Date() },
        { new: true }
      );
    } catch {
      return null;
    }
  }
}

export default new ShopOwnerRepository();
