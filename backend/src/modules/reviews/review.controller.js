import * as reviewService from "./review.service.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    if (error.code === "REVIEW_ALREADY_EXISTS") {
      return res.status(409).json({
        success: false,
        message: error.message,
        code: "REVIEW_ALREADY_EXISTS",
      });
    }
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const checkOrderEligibility = async (req, res, next) => {
  try {
    const result = await reviewService.checkOrderEligibility(
      req.params.orderId,
      req.user
    );

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getShopReviews = async (req, res, next) => {
  try {
    const data = await reviewService.getShopReviews(
      req.params.shopId,
      req.query
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyReviews = async (req, res, next) => {
  try {
    const data = await reviewService.getCustomerReviews(
      req.user._id,
      req.query
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.body,
      req.user
    );

    return res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user);

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const toggleHelpful = async (req, res, next) => {
  try {
    const result = await reviewService.toggleHelpful(req.params.id, req.user);

    return res.json({
      success: true,
      message: result.helpful ? "Marked as helpful" : "Removed helpful vote",
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const reportReview = async (req, res, next) => {
  try {
    const report = await reviewService.reportReview(
      req.params.id,
      req.user,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Review reported for moderation",
      data: report,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const replyToReview = async (req, res, next) => {
  try {
    const review = await reviewService.replyToReview(
      req.params.id,
      req.user,
      req.body
    );

    return res.json({
      success: true,
      message: "Reply posted successfully",
      data: review,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const deleteOwnerReply = async (req, res, next) => {
  try {
    const review = await reviewService.deleteOwnerReply(
      req.params.id,
      req.user
    );

    return res.json({
      success: true,
      message: "Reply deleted successfully",
      data: review,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

export const adminGetReviews = async (req, res, next) => {
  try {
    const data = await reviewService.adminGetReviews(req.query);
    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const adminUpdateStatus = async (req, res, next) => {
  try {
    const review = await reviewService.adminUpdateStatus(
      req.params.id,
      req.body.status
    );

    return res.json({
      success: true,
      message: `Review status updated to ${req.body.status}`,
      data: review,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};
