import DeviceToken from "./deviceToken.model.js";

export const createOrUpdate = async (data) => {
  return DeviceToken.findOneAndUpdate(
    { user: data.user, deviceId: data.deviceId },
    { ...data, active: true, lastSeen: new Date() },
    { upsert: true, new: true }
  );
};

export const findByUser = (userId) =>
  DeviceToken.find({ user: userId, active: true }).sort({ updatedAt: -1 });

export const remove = (filter) => DeviceToken.findOneAndDelete(filter);
