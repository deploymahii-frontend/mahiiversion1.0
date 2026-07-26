import DeliveryLocation from "../models/deliveryLocation.model.js";

class DeliveryLocationRepository {
  async upsertByPartner(partnerId, data) {
    return DeliveryLocation.findOneAndUpdate(
      { deliveryPartner: partnerId },
      { ...data, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  }

  async findByAssignment(assignmentId) {
    return DeliveryLocation.findOne({ assignment: assignmentId });
  }
}

export default new DeliveryLocationRepository();
