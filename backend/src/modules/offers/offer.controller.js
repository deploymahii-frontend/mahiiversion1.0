import * as offerService from "./offer.service.js";

/**
 * Create Offer
 */
export const createOffer = async (req, res, next) => {
  try {
    const offer = await offerService.createOffer({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Offer created successfully.",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Shop Offers
 */
export const getShopOffers = async (req, res, next) => {
  try {
    const offers = await offerService.getShopOffers(req.params.shopId);

    return res.json({
      success: true,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Active Offers
 */
export const getActiveOffers = async (req, res, next) => {
  try {
    const offers = await offerService.getActiveOffers();

    return res.json({
      success: true,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Offer
 */
export const updateOffer = async (req, res, next) => {
  try {
    const offer = await offerService.updateOffer(req.params.id, req.body);

    return res.json({
      success: true,
      message: "Offer updated successfully.",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Offer
 */
export const deleteOffer = async (req, res, next) => {
  try {
    await offerService.deleteOffer(req.params.id);

    return res.json({
      success: true,
      message: "Offer deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Claim Offer
 */
export const claimOffer = async (req, res, next) => {
  try {
    const offer = await offerService.claimOffer(req.params.id);

    return res.json({
      success: true,
      message: "Offer claimed successfully.",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};
