import DeliveryWallet from "../models/deliveryWallet.model.js";

class DeliveryWalletRepository {
  async findByPartner(partnerId) {
    return DeliveryWallet.findOne({ deliveryPartner: partnerId });
  }

  async upsertWallet(partnerId, data) {
    return DeliveryWallet.findOneAndUpdate(
      { deliveryPartner: partnerId },
      data,
      { new: true, upsert: true }
    );
  }
}

export default new DeliveryWalletRepository();
