import * as repository from "./offer.repository.js";
import { OFFER_STATUS } from "./offer.constants.js";

/**
 * Create Offer
 */
export const createOffer = async (offerData) => {
  if (new Date(offerData.validTill) <= new Date(offerData.validFrom)) {
    throw new Error("Offer expiry date must be after the start date.");
  }

  return repository.createOffer({
    ...offerData,
    status: OFFER_STATUS.ACTIVE,
  });
};

/**
 * Get Offer By ID
 */
export const getOfferById = (id) => {
  return repository.findOfferById(id);
};

export const getCouponByCode = (shopId, couponCode) => {
  return repository.findActiveCouponByCode(shopId, couponCode);
};

/**
 * Get Shop Offers
 */
export const getShopOffers = (shopId) => {
  return repository.findShopOffers(shopId);
};

/**
 * Get Active Offers
 */
export const getActiveOffers = () => {
  return repository.listActiveOffers();
};

/**
 * Update Offer
 */
export const updateOffer = (id, data) => {
  return repository.updateOffer(id, data);
};

/**
 * Delete Offer
 */
export const deleteOffer = (id) => {
  return repository.deleteOffer(id);
};

/**
 * Claim Offer
 */
export const claimOffer = (id) => {
  return repository.incrementClaim(id);
};
