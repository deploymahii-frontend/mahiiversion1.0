import deliveryService from "../services/delivery.service.js";

export async function getProfile(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    return res.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const updatedPartner = await deliveryService.updateOnlineStatus(
      partner._id,
      req.body.online
    );

    return res.json({
      success: true,
      data: updatedPartner,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLocation(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const location = await deliveryService.updateCurrentLocation(
      partner._id,
      req.body
    );

    return res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
}
