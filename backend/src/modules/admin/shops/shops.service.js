import shopsRepository from "./shops.repository.js";

const getShops = async (query) => {
  return await shopsRepository.getShops(query);
};

const getShopById = async (id) => {
  return await shopsRepository.getShopById(id);
};

const updateShopStatus = async (id, status) => {
  return await shopsRepository.updateShop(id, { status });
};

const updateShop = async (id, data) => {
  return await shopsRepository.updateShop(id, data);
};

export default { getShops, getShopById, updateShopStatus, updateShop };