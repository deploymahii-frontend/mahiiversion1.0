import * as momentService from "./moment.service.js";

export const createMoment = async (req, res, next) => {
  try {
    const role = req.user?.role?.name || req.user?.role || "CUSTOMER";
    const moment = await momentService.createMoment(req.user._id, role, req.body);

    return res.status(201).json({
      success: true,
      message: "Moment created successfully",
      data: moment,
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

export const getFeed = async (req, res, next) => {
  try {
    const data = await momentService.getFeed(req.query, req.user);
    return res.json({
      success: true,
      data: data.moments || data,
      meta: {
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getShopMoments = async (req, res, next) => {
  try {
    const data = await momentService.getShopMoments(req.params.shopId, req.query);
    return res.json({
      success: true,
      data: data.moments || data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductMoments = async (req, res, next) => {
  try {
    const data = await momentService.getProductMoments(req.params.productId, req.query);
    return res.json({
      success: true,
      data: data.moments || data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMomentById = async (req, res, next) => {
  try {
    const moment = await momentService.getMomentById(req.params.id, req.user);
    return res.json({
      success: true,
      data: moment,
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

export const likeMoment = async (req, res, next) => {
  try {
    const userId = req.user?._id || null;
    const result = await momentService.likeMoment(userId, req.params.id);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const saveMoment = async (req, res, next) => {
  try {
    const result = await momentService.saveMoment(req.user._id, req.params.id);
    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedMoments = async (req, res, next) => {
  try {
    const data = await momentService.getSavedMoments(req.user._id, req.query);
    return res.json({
      success: true,
      data: data.moments || data,
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await momentService.getComments(req.params.id);
    return res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const commentOnMoment = async (req, res, next) => {
  try {
    const comment = await momentService.commentOnMoment(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(201).json({
      success: true,
      data: comment,
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

export const deleteComment = async (req, res, next) => {
  try {
    await momentService.deleteComment(req.params.commentId, req.user._id);
    return res.json({
      success: true,
      message: "Comment deleted",
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

export const reportMoment = async (req, res, next) => {
  try {
    const report = await momentService.reportMoment(
      req.user._id,
      req.params.id,
      req.body
    );
    return res.status(201).json({
      success: true,
      message: "Moment reported for moderation",
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

export const trackView = async (req, res, next) => {
  try {
    const result = await momentService.viewMoment(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const trackShopClick = async (req, res, next) => {
  try {
    const result = await momentService.trackShopClick(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const trackProductClick = async (req, res, next) => {
  try {
    const result = await momentService.trackProductClick(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const trackCartAddition = async (req, res, next) => {
  try {
    const result = await momentService.trackCartAddition(req.params.id);
    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getOwnerAnalytics = async (req, res, next) => {
  try {
    const data = await momentService.getOwnerAnalytics(req.user._id);
    return res.json({ success: true, data });
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

// Stories
export const createStory = async (req, res, next) => {
  try {
    const role = req.user?.role?.name || req.user?.role || "CUSTOMER";
    const story = await momentService.createStory(req.user._id, role, req.body);
    return res.status(201).json({ success: true, data: story });
  } catch (error) {
    next(error);
  }
};

export const getActiveStories = async (req, res, next) => {
  try {
    const stories = await momentService.getActiveStories();
    return res.json({ success: true, data: stories });
  } catch (error) {
    next(error);
  }
};

// Admin Moderation
export const adminGetMoments = async (req, res, next) => {
  try {
    const data = await momentService.adminGetMoments(req.query);
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const adminUpdateStatus = async (req, res, next) => {
  try {
    const moment = await momentService.adminUpdateStatus(
      req.params.id,
      req.body.status
    );
    return res.json({ success: true, data: moment });
  } catch (error) {
    next(error);
  }
};

export const adminToggleFeatured = async (req, res, next) => {
  try {
    const moment = await momentService.adminToggleFeatured(req.params.id);
    return res.json({ success: true, data: moment });
  } catch (error) {
    next(error);
  }
};
