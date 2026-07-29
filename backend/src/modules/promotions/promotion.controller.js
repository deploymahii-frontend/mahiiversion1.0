import * as service from "./promotion.service.js";
import { successResponse, errorResponse } from "../../utils/api-response.js";

export async function createPromotion(req, res) {
  try {
    const promotion = await service.createPromotion(req.user.id, req.body);
    res.status(201).json(successResponse(promotion));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function getNearbyPromotions(req, res) {
  try {
    const { shopIds } = req.query;
    const parsedShopIds = shopIds
      ? Array.isArray(shopIds)
        ? shopIds
        : shopIds.split(",").map((id) => id.trim()).filter(Boolean)
      : [];

    const promotions = await service.getNearbyPromotions(parsedShopIds);
    res.json(successResponse(promotions));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function getShopPromotions(req, res) {
  try {
    const { id } = req.params;
    const promotions = await service.getShopPromotions(id);
    res.json(successResponse(promotions));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function viewPromotion(req, res) {
  try {
    const { id } = req.params;
    const promotion = await service.trackPromotionView(id);
    res.json(successResponse(promotion));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

export async function clickPromotion(req, res) {
  try {
    const { id } = req.params;
    const promotion = await service.trackPromotionClick(id);
    res.json(successResponse(promotion));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}
