import * as recommendationService from "./recommendation.service.js";

export const getTrending = async (req, res, next) => {
  try {
    const shops = await recommendationService.getTrending();

    return res.json({
      success: true,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (req, res, next) => {
  try {
    const shops = await recommendationService.getFeatured();

    return res.json({
      success: true,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

export const getSimilar = async (req, res, next) => {
  try {
    const shops = await recommendationService.getSimilar(req.params.shopId);

    return res.json({
      success: true,
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};
