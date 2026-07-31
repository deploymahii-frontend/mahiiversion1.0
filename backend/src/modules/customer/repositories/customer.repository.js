import mongoose from "mongoose";
import Customer from "../customer.model.js";

export class CustomerRepository {
  async findByUserId(userId) {
    try {
      return await Customer.findOne({ userId }).populate("favouriteShops");
    } catch (err) {
      return null;
    }
  }

  async create(data) {
    return await Customer.create(data);
  }

  async update(userId, data) {
    return await Customer.findOneAndUpdate({ userId }, data, { new: true });
  }

  async getDashboardCustomer(userId) {
    try {
      return await Customer.findOne({ userId }).populate({
        path: "favouriteShops",
        select: "name image category rating",
      });
    } catch (err) {
      return null;
    }
  }

  async getWallet(userId) {
    try {
      const Wallet = mongoose.models.Wallet || mongoose.models.wallets;
      if (!Wallet) return { balance: 0, cashback: 0 };
      return (await Wallet.findOne({ user: userId })) || { balance: 0, cashback: 0 };
    } catch (err) {
      return { balance: 0, cashback: 0 };
    }
  }

  async getRecentOrders(userId, limit = 5) {
    try {
      const Order = mongoose.models.Order || mongoose.models.orders;
      if (!Order) return [];
      return (
        (await Order.find({ user: userId, customerId: userId })
          .sort({ createdAt: -1 })
          .limit(limit)
          .populate("shop", "name logo rating")
          .lean()) || []
      );
    } catch (err) {
      return [];
    }
  }

  async getMembership(userId) {
    try {
      const Membership = mongoose.models.Membership || mongoose.models.memberships;
      if (!Membership) return { active: false, plan: "Free Tier" };
      return (await Membership.findOne({ user: userId, status: "ACTIVE" })) || { active: false, plan: "Free Tier" };
    } catch (err) {
      return { active: false, plan: "Free Tier" };
    }
  }

  async getNotifications(userId, limit = 5) {
    try {
      const Notification = mongoose.models.Notification || mongoose.models.notifications;
      if (!Notification) return [];
      return (
        (await Notification.find({ user: userId })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean()) || []
      );
    } catch (err) {
      return [];
    }
  }

  async getWishlistCount(userId) {
    try {
      const Wishlist = mongoose.models.Wishlist || mongoose.models.wishlists;
      if (!Wishlist) return 0;
      const wishlist = await Wishlist.findOne({ user: userId });
      return wishlist?.items?.length || 0;
    } catch (err) {
      return 0;
    }
  }

  async getOffers(limit = 4) {
    try {
      const Offer = mongoose.models.Offer || mongoose.models.offers || mongoose.models.Promotion;
      if (!Offer) return [];
      return (await Offer.find({ active: true }).limit(limit).lean()) || [];
    } catch (err) {
      return [];
    }
  }
}

export default new CustomerRepository();
