export class DashboardDTO {
  static format({
    user,
    wallet,
    membership,
    recentOrders = [],
    notifications = [],
    wishlistCount = 0,
    cartCount = 0,
    savedAmount = 0,
    rewardPoints = 0,
    analytics = {},
    quickActions = [],
    recommendedShops = [],
    offers = [],
  }) {
    return {
      profile: {
        id: user?._id || user?.id,
        name: user?.name || user?.fullName || "Valued Customer",
        email: user?.email,
        phone: user?.phone || user?.phoneNumber,
        avatar: user?.avatar || user?.profilePicture,
        isGold: Boolean(membership?.active),
      },
      wallet: {
        balance: wallet?.balance ?? 0,
        currency: wallet?.currency || "INR",
        cashback: wallet?.cashback ?? 0,
      },
      membership: {
        active: Boolean(membership?.active),
        plan: membership?.plan || "Standard Member",
        expiresAt: membership?.expiresAt || null,
      },
      recentOrders: recentOrders.map((order) => ({
        id: order._id || order.id,
        orderNumber: order.orderNumber || order.orderId || `#ORD-${String(order._id).slice(-6)}`,
        shopName: order.shop?.name || order.shopName || "Mahii Partner Shop",
        totalAmount: order.totalAmount || order.total || 0,
        status: order.status || "PLACED",
        itemsCount: order.items?.length || 0,
        createdAt: order.createdAt,
      })),
      notifications: notifications.map((n) => ({
        id: n._id || n.id,
        title: n.title,
        message: n.message,
        type: n.type || "SYSTEM",
        read: Boolean(n.read || n.isRead),
        createdAt: n.createdAt,
      })),
      stats: {
        wishlistCount,
        cartCount,
        savedAmount,
        rewardPoints,
      },
      analytics: {
        totalOrdersCount: analytics.totalOrdersCount || recentOrders.length,
        favoriteCategory: analytics.favoriteCategory || "Mess & Food",
      },
      quickActions: quickActions.length
        ? quickActions
        : [
            { title: "Reorder", route: "/customer/orders" },
            { title: "Wallet Top-up", route: "/customer/wallet" },
            { title: "Saved Places", route: "/customer/wishlist" },
            { title: "Help", route: "/customer/support" },
          ],
      recommendedShops,
      offers,
    };
  }
}
