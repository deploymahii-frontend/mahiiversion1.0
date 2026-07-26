import DeliveryAssignment from "../models/deliveryAssignment.model.js";

class DeliveryAssignmentRepository {
  async create(data) {
    return DeliveryAssignment.create(data);
  }

  async findById(id) {
    return DeliveryAssignment.findById(id)
      .populate("order")
      .populate("partner");
  }

  async updateStatus(id, status, updateData = {}) {
    return DeliveryAssignment.findByIdAndUpdate(
      id,
      { status, ...updateData },
      { new: true }
    );
  }

  async findByPartner(partnerId) {
    return DeliveryAssignment.find({ partner: partnerId })
      .populate("order")
      .sort({ createdAt: -1 });
  }
}

export default new DeliveryAssignmentRepository();
