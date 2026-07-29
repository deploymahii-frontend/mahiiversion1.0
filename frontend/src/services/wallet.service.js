import api from "./api";

const BASE_PATH = "/wallets";

export const getWallet = async () => {
  return await api.get(`${BASE_PATH}`);
};

export const getTransactions = async (page = 1, limit = 20) => {
  return await api.get(`${BASE_PATH}/transactions`, {
    params: { page, limit }
  });
};

export const addReward = async (amount, description) => {
  return await api.post(`${BASE_PATH}/reward`, { amount, description });
};
