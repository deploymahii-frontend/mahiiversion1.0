import locationService from "../services/location.service.js";
import deliveryService from "../services/delivery.service.js";

export async function updateLocation(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const location = await locationService.updateLocation(partner._id, req.body);

    return res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLocationByAssignment(req, res, next) {
  try {
    const location = await locationService.getLocationByAssignment(
      req.params.assignmentId
    );

    return res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
}
