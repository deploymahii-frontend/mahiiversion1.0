import shopOwnerRepository from "./shopOwner.repository.js";

export class ShopOwnerService {

  /* ── Shop Profile ─────────────────────────── */
  async getShopProfile(ownerId) {
    return shopOwnerRepository.findShopByOwner(ownerId);
  }

  async updateShopProfile(ownerId, data) {
    return shopOwnerRepository.updateShop(ownerId, data);
  }

  async toggleShopStatus(ownerId, isOpen) {
    return shopOwnerRepository.updateShop(ownerId, { isOpen });
  }

  /* ── Dashboard ────────────────────────────── */
  async getDashboard(ownerId) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) {
      return {
        shopExists: false,
        message: "No shop registered for this account",
        stats: {},
      };
    }

    const stats = await shopOwnerRepository.getDashboardStats(shop._id);

    return {
      shopExists: true,
      shop: {
        id: shop._id,
        name: shop.name,
        status: shop.status,
        isVerified: shop.isVerified,
        logo: shop.images?.logo || shop.logo,
        category: shop.category,
      },
      stats,
    };
  }

  /* ── Orders ───────────────────────────────── */
  async getOrders(ownerId, query = {}) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) return [];
    return shopOwnerRepository.getShopOrders(shop._id, query);
  }

  async updateOrderStatus(ownerId, orderId, status) {
    const ALLOWED = ["ACCEPTED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
    if (!ALLOWED.includes(status)) throw new Error(`Invalid status: ${status}`);

    const order = await shopOwnerRepository.findOrderById(orderId);
    if (!order) throw new Error("Order not found");

    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop || order.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This order does not belong to your shop");
    }

    return shopOwnerRepository.updateOrderStatus(orderId, status);
  }

  /* ── Products ─────────────────────────────── */
  async getProducts(ownerId) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) return [];
    return shopOwnerRepository.getShopProducts(shop._id);
  }

  async createProduct(ownerId, data) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");
    return shopOwnerRepository.createProduct({ ...data, shop: shop._id });
  }

  async updateProduct(ownerId, productId, data) {
    return shopOwnerRepository.updateProduct(productId, data);
  }

  async deleteProduct(ownerId, productId) {
    return shopOwnerRepository.deleteProduct(productId);
  }

  async updateStock(ownerId, productId, quantity) {
    return shopOwnerRepository.updateProductStock(productId, Number(quantity));
  }

  async toggleAvailability(ownerId, productId, available) {
    return shopOwnerRepository.toggleProductAvailability(productId, available);
  }

  /* ── Analytics ────────────────────────────── */
  async getAnalytics(ownerId, days = 30) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) return { revenue: [], topProducts: [] };

    const [revenue, topProducts] = await Promise.all([
      shopOwnerRepository.getRevenueAnalytics(shop._id, days),
      shopOwnerRepository.getTopProducts(shop._id),
    ]);

    return { revenue, topProducts };
  }

  /* ── Reviews ──────────────────────────────── */
  async getReviews(ownerId) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) return { reviews: [], rating: 0, totalReviews: 0 };

    const reviews = await shopOwnerRepository.getShopReviews(shop._id);
    const totalReviews = reviews.length;
    const rating = totalReviews
      ? +(reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
      : 0;

    return { reviews, rating, totalReviews };
  }

  async replyToReview(ownerId, reviewId, reply) {
    return shopOwnerRepository.replyToReview(reviewId, reply);
  }
}

export default new ShopOwnerService();
