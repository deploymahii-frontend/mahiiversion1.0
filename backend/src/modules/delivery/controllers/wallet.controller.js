import walletService from "../services/wallet.service.js";
import deliveryService from "../services/delivery.service.js";

export async function getWallet(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const wallet = await walletService.getWallet(partner._id);

    return res.json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEarnings(req, res, next) {
  try {
    const partner = await deliveryService.getPartner(req.user._id);

    if (!partner) {
      throw new Error("Delivery partner not found.");
    }

    const earnings = await walletService.getEarnings(partner._id);

    return res.json({
      success: true,
      data: earnings,
    });
  } catch (error) {
    next(error);
  }
}
