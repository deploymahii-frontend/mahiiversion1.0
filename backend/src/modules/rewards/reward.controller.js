import * as rewardService from "./reward.service.js";
import { successResponse } from "../../utils/api-response.js";

export const createReward = async (req, res, next) => {
  try {
    const reward = await rewardService.createReward({
      creator: req.user._id,
      moment: req.body.moment,
      type: req.body.type,
      amount: req.body.amount,
      reason: req.body.reason,
      isProcessed: req.body.isProcessed || false,
    });

    return successResponse(res, reward, "Reward created successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyRewards = async (req, res, next) => {
  try {
    const rewards = await rewardService.getCreatorRewards(req.user._id);

    const totalEarned = rewards.reduce((sum, reward) => sum + reward.amount, 0);
    const paid = rewards.filter((reward) => reward.isProcessed).reduce((sum, reward) => sum + reward.amount, 0);
    const pending = totalEarned - paid;

    return successResponse(res, { totalEarned, pending, paid }, "Creator earnings fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const approveReward = async (req, res, next) => {
  try {
    const reward = await rewardService.approveReward(req.params.id);

    return successResponse(res, reward, "Reward approved successfully");
  } catch (error) {
    next(error);
  }
};
