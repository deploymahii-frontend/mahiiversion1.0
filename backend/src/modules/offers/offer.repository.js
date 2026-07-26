import Offer from "./offer.model.js";

export const createOffer = (data) => {
  return Offer.create(data);
};

export const findOfferById = (id) => {
  return Offer.findById(id).populate("shop", "name slug");
};

export const findActiveCouponByCode = (shopId, couponCode) => {
  return Offer.findOne({
    shop: shopId,
    couponCode: couponCode.toUpperCase(),
    isActive: true,
    status: "active",
    validFrom: { $lte: new Date() },
    validTill: { $gte: new Date() },
  });
};

export const findShopOffers = (shopId) => {
  return Offer.find({
    shop: shopId,
    isActive: true,
    status: "active",
  }).sort({ validTill: 1 });
};

export const listActiveOffers = () => {
  return Offer.find({
    isActive: true,
    status: "active",
  })
    .populate("shop", "name slug logo")
    .sort({ createdAt: -1 });
};

export const updateOffer = (id, data) => {
  return Offer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteOffer = (id) => {
  return Offer.findByIdAndDelete(id);
};

export const incrementClaim = (id) => {
  return Offer.findByIdAndUpdate(
    id,
    {
      $inc: {
        totalClaims: 1,
      },
    },
    { new: true }
  );
};
