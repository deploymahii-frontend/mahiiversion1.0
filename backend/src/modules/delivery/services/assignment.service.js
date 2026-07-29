import deliveryRepository from "../repositories/delivery.repository.js";
import assignmentRepository from "../repositories/assignment.repository.js";
import * as orderRepository from "../../orders/order.repository.js";

class AssignmentService {
  async findNearestPartner() {
    return deliveryRepository.findOnlineVerifiedPartner();
  }

  async assignOrder(orderId) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found.");
    }

    const partner = await this.findNearestPartner();

    if (!partner) {
      throw new Error("No delivery partner available.");
    }

    return assignmentRepository.create({
      order: order._id,
      partner: partner._id,
      customerOTP: String(Math.floor(100000 + Math.random() * 900000)),
      distance: 0,
      earnings: 0,
    });
  }

  async acceptAssignment(assignmentId) {
    return assignmentRepository.updateStatus(assignmentId, "ACCEPTED", {
      acceptedAt: new Date(),
    });
  }

  async rejectAssignment(assignmentId) {
    const assignment = await assignmentRepository.updateStatus(
      assignmentId,
      "REJECTED"
    );

    if (!assignment) {
      throw new Error("Assignment not found.");
    }

    return this.assignOrder(assignment.order);
  }

  async markPickedUp(assignmentId) {
    return assignmentRepository.updateStatus(assignmentId, "PICKED_UP", {
      pickedUpAt: new Date(),
    });
  }

  async markDelivered(assignmentId) {
    return assignmentRepository.updateStatus(assignmentId, "DELIVERED", {
      deliveredAt: new Date(),
    });
  }

  async getOrders(partnerId) {
    return assignmentRepository.findByPartner(partnerId);
  }
}

export default new AssignmentService();
