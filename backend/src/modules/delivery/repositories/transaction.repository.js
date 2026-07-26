import DeliveryTransaction from "../models/deliveryTransaction.model.js";

class DeliveryTransactionRepository {
  async create(data) {
    return DeliveryTransaction.create(data);
  }

  async findByPartner(partnerId) {
    return DeliveryTransaction.find({ deliveryPartner: partnerId })
      .sort({ createdAt: -1 });
  }
}

export default new DeliveryTransactionRepository();
