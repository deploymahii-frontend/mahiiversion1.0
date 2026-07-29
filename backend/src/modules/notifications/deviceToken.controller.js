import * as deviceTokenService from "./deviceToken.service.js";

export const registerDeviceToken = async (req, res, next) => {
  try {
    const token = await deviceTokenService.registerDeviceToken({
      user: req.user._id,
      ...req.body,
    });

    return res.json({
      success: true,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeviceTokens = async (req, res, next) => {
  try {
    const tokens = await deviceTokenService.getDeviceTokens(req.user._id);

    return res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDeviceToken = async (req, res, next) => {
  try {
    const { deviceId, token } = req.body;
    await deviceTokenService.deleteDeviceToken({
      user: req.user._id,
      deviceId,
      token,
    });

    return res.json({
      success: true,
      message: "Device token removed successfully.",
    });
  } catch (error) {
    next(error);
  }
};
