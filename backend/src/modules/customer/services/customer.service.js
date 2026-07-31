import customerRepository from "../repositories/customer.repository.js";
import { DashboardDTO } from "../dto/dashboard.dto.js";

export class CustomerService {
  async getProfile(userId) {
    let customer = await customerRepository.findByUserId(userId);
    if (!customer) {
      customer = await customerRepository.create({ userId });
    }
    return customer;
  }

  async updateProfile(userId, data) {
    return await customerRepository.update(userId, data);
  }

  async getDashboardData(user) {
    const userId = user._id || user.id;

    const [
      customerProfile,
      wallet,
      recentOrders,
      membership,
      notifications,
      wishlistCount,
      offers,
    ] = await Promise.all([
      this.getProfile(userId),
      customerRepository.getWallet(userId),
      customerRepository.getRecentOrders(userId, 5),
      customerRepository.getMembership(userId),
      customerRepository.getNotifications(userId, 5),
      customerRepository.getWishlistCount(userId),
      customerRepository.getOffers(4),
    ]);

    return DashboardDTO.format({
      user,
      customerProfile,
      wallet: wallet.balance ? wallet : { balance: customerProfile.walletBalance || 0, cashback: 0 },
      recentOrders,
      membership,
      notifications,
      wishlistCount,
      cartCount: 0,
      savedAmount: 8540,
      rewardPoints: 4520,
      analytics: {
        totalOrdersCount: customerProfile.totalOrders || recentOrders.length,
        completedOrdersCount: customerProfile.completedOrders || 0,
        favoriteCategory: "Mess Subscriptions",
      },
      offers,
    });
  }
}

export default new CustomerService();
