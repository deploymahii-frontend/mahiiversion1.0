import * as repository from "./reward.repository.js";
import * as walletService from "../wallets/wallet.service.js";
import { REWARD_TYPE } from "./reward.constants.js";

export async function createReward(data) {
  const reward = await repository.createReward({
    creator: data.creator,
    moment: data.moment || null,
    type: data.type,
    amount: data.amount,
    reason: data.reason || "",
    isProcessed: data.isProcessed || false,
  });

  if (reward.amount > 0 && !reward.isProcessed) {
    await walletService.addReward(data.creator, {
      user: data.creator,
      type: reward.type,
      entryType: "BALANCE",
      amount: reward.amount,
      points: 0,
      reason: reward.reason || `Reward for ${reward.type}`,
      metadata: { rewardId: reward._id, moment: reward.moment || null },
    });

    await repository.updateReward(reward._id, { isProcessed: true });
  }

  return reward;
}

export const getCreatorRewards = (creatorId) =>
  repository.findRewardsByCreator(creatorId);

export const approveReward = async (id) => {
  const reward = await repository.findRewardById(id);

  if (!reward) {
    throw new Error("Reward not found.");
  }

  if (reward.isProcessed) {
    return reward;
  }

  const processedReward = await walletService.addReward(reward.creator, {
    user: reward.creator,
    type: reward.type,
    entryType: "BALANCE",
    amount: reward.amount,
    points: 0,
    reason: reward.reason || `Approved reward ${reward._id}`,
    metadata: { rewardId: reward._id, moment: reward.moment || null },
  });

  await repository.updateReward(reward._id, { isProcessed: true });

  return processedReward;
};
