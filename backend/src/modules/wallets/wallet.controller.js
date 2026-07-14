import * as walletService from "./wallet.service.js";
import { successResponse } from "../../utils/api-response.js";

export async function getWallet(req, res, next) {
  try {
    const data = await walletService.getWallet(req.user._id);

    return successResponse(res, data, "Wallet fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function getTransactions(req, res, next) {
  try {
    const data = await walletService.getTransactions(req.user._id);

    return successResponse(res, data, "Wallet transactions fetched successfully");
  } catch (error) {
    next(error);
  }
}

export async function addReward(req, res, next) {
  try {
    const result = await walletService.addReward(req.user._id, req.body);

    return successResponse(res, result, "Reward added successfully", 201);
  } catch (error) {
    next(error);
  }
}
