import Reward from "./reward.model.js";

export const createReward = (data) => Reward.create(data);

export const findRewardById = (id) => Reward.findById(id);

export const updateReward = (id, data) =>
  Reward.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const findRewardsByCreator = (creatorId) =>
  Reward.find({ creator: creatorId }).sort({ createdAt: -1 });
