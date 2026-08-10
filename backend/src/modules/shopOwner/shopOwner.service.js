import shopOwnerRepository from "./shopOwner.repository.js";
import Shop from "../shops/shop.model.js";

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
    let shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) {
      const cleanOwnerStr = ownerId ? ownerId.toString().slice(-6) : Math.floor(1000 + Math.random() * 9000);
      shop = await Shop.create({
        owner: ownerId,
        name: data.shopName || "My Shop",
        slug: `shop-${cleanOwnerStr}-${Math.floor(1000 + Math.random() * 9000)}`,
        category: data.category || "General",
        status: "APPROVED",
        isOpen: true,
      });
    }

    if (!data.name || !data.name.trim()) {
      throw new Error("Product name is required");
    }

    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      throw new Error("Product price must be a valid positive number");
    }

    const cleanName = data.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const slug = data.slug || `${cleanName}-${randomSuffix}`;

    const payload = {
      ...data,
      name: data.name.trim(),
      description: data.description ? data.description.trim() : "",
      sku: data.sku ? data.sku.trim() : "",
      shop: shop._id,
      slug,
      price,
      discountedPrice: data.discountedPrice ? Number(data.discountedPrice) : undefined,
      category: data.category || "General",
      status: data.status || (data.available === false ? "INACTIVE" : "ACTIVE"),
      available: data.available ?? true,
      inventory: {
        quantity: data.stock !== undefined ? Number(data.stock) : Number(data.inventory?.quantity || 100),
        trackInventory: data.trackInventory ?? true,
      },
    };

    return shopOwnerRepository.createProduct(payload);
  }

  async updateProduct(ownerId, productId, data) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");

    const product = await shopOwnerRepository.findProductById(productId);
    if (!product || product.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This product does not belong to your shop");
    }

    const updatePayload = { ...data };
    if (data.price !== undefined) updatePayload.price = Number(data.price);
    if (data.discountedPrice !== undefined) updatePayload.discountedPrice = Number(data.discountedPrice);
    if (data.stock !== undefined) {
      updatePayload["inventory.quantity"] = Number(data.stock);
    }
    if (data.status) {
      updatePayload.available = data.status === "ACTIVE";
    }

    return shopOwnerRepository.updateProduct(productId, updatePayload);
  }

  async deleteProduct(ownerId, productId) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");

    const product = await shopOwnerRepository.findProductById(productId);
    if (!product || product.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This product does not belong to your shop");
    }

    // Soft delete / archive product
    return shopOwnerRepository.updateProduct(productId, { status: "ARCHIVED", available: false });
  }

  async updateStock(ownerId, productId, quantity) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");

    const product = await shopOwnerRepository.findProductById(productId);
    if (!product || product.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This product does not belong to your shop");
    }

    const qty = Number(quantity);
    const status = qty <= 0 ? "OUT_OF_STOCK" : "ACTIVE";
    return shopOwnerRepository.updateProduct(productId, {
      "inventory.quantity": qty,
      status,
      available: qty > 0,
    });
  }

  async toggleAvailability(ownerId, productId, available) {
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");

    const product = await shopOwnerRepository.findProductById(productId);
    if (!product || product.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This product does not belong to your shop");
    }

    const status = available ? "ACTIVE" : "INACTIVE";
    return shopOwnerRepository.updateProduct(productId, { available, status });
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
    const shop = await shopOwnerRepository.findShopByOwner(ownerId);
    if (!shop) throw new Error("No shop found for this account");

    const review = await shopOwnerRepository.findReviewById(reviewId);
    if (!review || review.shop.toString() !== shop._id.toString()) {
      throw new Error("Unauthorized: This review does not belong to your shop");
    }

    return shopOwnerRepository.replyToReview(reviewId, reply);
  }
}

export default new ShopOwnerService();
