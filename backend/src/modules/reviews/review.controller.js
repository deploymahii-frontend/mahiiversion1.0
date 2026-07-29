import * as reviewService from "./review.service.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview({
      ...req.body,
      customer: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getShopReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getShopReviews(req.params.shopId);

    return res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getCustomerReviews(req.user._id);

    return res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);

    return res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
