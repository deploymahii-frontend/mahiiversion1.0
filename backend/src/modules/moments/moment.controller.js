import * as momentService from "./moment.service.js";
import { successResponse, errorResponse } from "../../utils/api-response.js";

export const createMoment = async (req, res, next) => {
  try {
    const moment = await momentService.createMoment(req.user._id, req.body);

    return successResponse(res, moment, "Moment created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const moments = await momentService.getFeed();

    return successResponse(res, moments, "Moments feed fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const getShopMoments = async (req, res, next) => {
  try {
    const moments = await momentService.getShopMoments(req.params.shopId);

    return successResponse(res, moments, "Shop moments fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const likeMoment = async (req, res, next) => {
  try {
    const moment = await momentService.likeMoment(req.params.id);

    return successResponse(res, moment, "Moment liked successfully");
  } catch (error) {
    next(error);
  }
};

export const viewMoment = async (req, res, next) => {
  try {
    const moment = await momentService.viewMoment(req.params.id);

    return successResponse(res, moment, "Moment view tracked successfully");
  } catch (error) {
    next(error);
  }
};

export const trackShopClick = async (req, res, next) => {
  try {
    const moment = await momentService.trackShopClick(req.params.id);

    return successResponse(res, moment, "Moment shop click tracked successfully");
  } catch (error) {
    next(error);
  }
};
