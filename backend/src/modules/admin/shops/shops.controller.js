import shopsService from "./shops.service.js";

const getShops = async (req, res, next) => {
  try {
    const data = await shopsService.getShops(req.query);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

const getShopById = async (req, res, next) => {
  try {
    const data = await shopsService.getShopById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

const approveShop = async (req, res, next) => {
  try {
    const data = await shopsService.updateShopStatus(req.params.id, "APPROVED");
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

const rejectShop = async (req, res, next) => {
  try {
    const data = await shopsService.updateShopStatus(req.params.id, "REJECTED");
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

const suspendShop = async (req, res, next) => {
  try {
    const data = await shopsService.updateShopStatus(req.params.id, "SUSPENDED");
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

const updateShop = async (req, res, next) => {
  try {
    const data = await shopsService.updateShop(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export default { getShops, getShopById, approveShop, rejectShop, suspendShop, updateShop };