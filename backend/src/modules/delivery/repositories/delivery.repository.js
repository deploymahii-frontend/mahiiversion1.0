import DeliveryPartner from "../models/deliveryPartner.model.js";

class DeliveryRepository {
  async create(data) {
    return DeliveryPartner.create(data);
  }

  async findByUser(userId) {
    return DeliveryPartner.findOne({ user: userId });
  }

  async findById(id) {
    return DeliveryPartner.findById(id);
  }

  async updateStatus(id, online) {
    return DeliveryPartner.findByIdAndUpdate(
      id,
      { online },
      { new: true }
    );
  }

  async updateLocation(id, location) {
    return DeliveryPartner.findByIdAndUpdate(
      id,
      { currentLocation: location },
      { new: true }
    );
  }

  async findOnlineVerifiedPartner() {
    return DeliveryPartner.findOne({
      online: true,
      verified: true,
    }).sort({
      rating: -1,
      totalDeliveries: 1,
    });
  }
}

export default new DeliveryRepository();
