import assignmentService from "../services/assignment.service.js";
import deliveryService from "../services/delivery.service.js";

export async function assignOrder(req, res, next) {
  try {
    const assignment = await assignmentService.assignOrder(req.params.id);

    return res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
}

export async function acceptAssignment(req, res, next) {
  try {
    const assignment = await assignmentService.acceptAssignment(
      req.params.id
    );

    return res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const assignments = await assignmentService.getOrders(partner._id);

    return res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
}

export async function rejectAssignment(req, res, next) {
  try {
    const assignment = await assignmentService.rejectAssignment(
      req.params.id
    );

    return res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
}

export async function pickedUp(req, res, next) {
  try {
    const assignment = await assignmentService.markPickedUp(req.params.id);

    return res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
}

export async function delivered(req, res, next) {
  try {
    const assignment = await assignmentService.markDelivered(req.params.id);

    return res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
}
