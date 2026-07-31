import ShopModel from "../../shops/shop.model.js";

const getShops = async (query) => {
  return await ShopModel.find(query).lean();
};

const getShopById = async (id) => {
  return await ShopModel.findById(id).lean();
};

const updateShop = async (id, data) => {
  return await ShopModel.findByIdAndUpdate(id, data, { new: true }).lean();
};

export default { getShops, getShopById, updateShop };