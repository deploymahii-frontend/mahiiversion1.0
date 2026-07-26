import * as repository from "./deviceToken.repository.js";

export const registerDeviceToken = async (data) =>
  repository.createOrUpdate(data);

export const getDeviceTokens = async (userId) =>
  repository.findByUser(userId);

export const deleteDeviceToken = async (filter) =>
  repository.remove(filter);
