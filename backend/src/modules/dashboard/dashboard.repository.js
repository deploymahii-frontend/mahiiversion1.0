import Shop from "../shops/shop.model.js";
import Order from "../orders/order.model.js";
import Product from "../products/product.model.js";
import Review from "../reviews/review.model.js";
import Offer from "../offers/offer.model.js";
import Moment from "../moments/moment.model.js";
import { ORDER_STATUS } from "../orders/order.constants.js";
import { PRODUCT_STATUS } from "../products/product.constants.js";

async function getOwnerShop(ownerId) {
  return Shop.findOne({ owner: ownerId }).lean();
}

export async function getDashboard(ownerId) {
  const shop = await getOwnerShop(ownerId);

  if (!shop) {
    throw new Error("Shop not found");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalOrders,
    completedOrders,
    pendingOrders,
    totalRevenue,
    totalProducts,
    totalReviews,
    activeOffers,
    activeProducts,
    recentOrders,
    todayOrders,
    todayRevenue,
    recentReviews,
    topProducts,
  ] = await Promise.all([
    Order.countDocuments({ shop: shop._id }),

    Order.countDocuments({
      shop: shop._id,
      orderStatus: ORDER_STATUS.COMPLETED,
    }),

    Order.countDocuments({
      shop: shop._id,
      orderStatus: {
        $in: [
          ORDER_STATUS.PLACED,
          ORDER_STATUS.ACCEPTED,
          ORDER_STATUS.PREPARING,
          ORDER_STATUS.READY,
        ],
      },
    }),

    Order.aggregate([
      {
        $match: {
          shop: shop._id,
          orderStatus: ORDER_STATUS.COMPLETED,
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]),

    Product.countDocuments({
      shop: shop._id,
    }),

    Product.countDocuments({
      shop: shop._id,
      status: PRODUCT_STATUS.ACTIVE,
    }),

    Review.countDocuments({
      shop: shop._id,
    }),

    Offer.countDocuments({
      shop: shop._id,
      isActive: true,
    }),

    Order.find({ shop: shop._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "fullName"),

    Order.countDocuments({
      shop: shop._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }),

    Order.aggregate([
      {
        $match: {
          shop: shop._id,
          createdAt: {
            $gte: today,
            $lt: tomorrow,
          },
          orderStatus: ORDER_STATUS.COMPLETED,
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]),

    Review.find({ shop: shop._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "fullName profileImage"),

    Product.find({ shop: shop._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name image price"),
  ]);

  const customerIds = await Order.distinct("customer", { shop: shop._id });

  return {
    business: {
      id: shop._id,
      name: shop.name,
      category: shop.category,
      verificationStatus: shop.verificationStatus,
      address: shop.address,
      logo: shop.logo,
    },
    stats: {
      catalogItems: totalProducts,
      activeCatalogItems: activeProducts,
      orders: totalOrders,
      customers: customerIds.length,
      views: shop.totalViews,
    },
    quickActions: {
      canAddCatalog: true,
      canEditBusiness: true,
    },
    recentActivity: [],
  };
}

export const getDashboardStats = async (ownerId) => {
  const shop = await Shop.findOne({ owner: ownerId });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [ordersToday, activeOffers, totalMoments] = await Promise.all([
    Order.countDocuments({
      shop: shop._id,
      createdAt: { $gte: today },
    }),

    Offer.countDocuments({
      shop: shop._id,
      isActive: true,
    }),

    Moment.countDocuments({
      shop: shop._id,
    }),
  ]);

  return {
    shopName: shop.name,
    rating: shop.rating,
    shopViews: shop.totalViews,
    totalReviews: shop.totalReviews,
    ordersToday,
    activeOffers,
    totalMoments,
  };
};
