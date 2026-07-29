import * as businessService from "./business.service.js";

export async function createBusiness(req, res, next) {
  try {
    const business = await businessService.createBusiness(
      req.user._id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBusiness(req, res, next) {
  try {
    const business = await businessService.getBusiness(req.params.id);

    return res.json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBusiness(req, res, next) {
  try {
    const business = await businessService.updateBusiness(
      req.params.id,
      req.user._id,
      req.body
    );

    return res.json({
      success: true,
      message: "Business updated successfully",
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

export async function listBusinesses(req, res, next) {
  try {
    const result = await businessService.listBusinesses(req.query);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBusiness(req, res, next) {
  try {
    await businessService.deleteBusiness(
      req.params.id,
      req.user._id
    );

    return res.json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
