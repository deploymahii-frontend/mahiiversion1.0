import DeliveryPartner from "./deliveryPartner.model.js";
import Order from "../orders/order.model.js";

export const availableOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "READY",
      deliveryStatus: "UNASSIGNED",
      isDeleted: false,
    }).populate("shop", "name address location");

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const partner = await DeliveryPartner.findOne({ user: req.user._id });

    if (!partner) {
      return res.status(404).json({ success: false, message: "Delivery partner profile not found" });
    }

    if (!partner.isOnline || !partner.isAvailable) {
      return res.status(400).json({ success: false, message: "You must be online and available to accept orders" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, orderStatus: "READY", deliveryStatus: "UNASSIGNED" },
      { deliveryPartner: partner._id, deliveryStatus: "ASSIGNED" },
      { new: true }
    );

    if (!order) {
      return res.status(400).json({ success: false, message: "Order is no longer available" });
    }

    partner.isAvailable = false;
    await partner.save();

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    const partner = await DeliveryPartner.findOne({ user: req.user._id });

    if (!partner) {
      return res.status(404).json({ success: false, message: "Delivery partner profile not found" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, deliveryPartner: partner._id },
      { deliveryStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found or not assigned to you" });
    }

    if (status === "DELIVERED") {
      partner.isAvailable = true;
      partner.totalDeliveries += 1;
      await partner.save();

      order.orderStatus = "DELIVERED";
      await order.save();
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEarnings = async (req, res) => {
  try {
    // Stub implementation for earnings
    res.json({
      success: true,
      data: {
        today: 850,
        thisWeek: 4750,
        thisMonth: 19240,
        completedDeliveries: 138,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { isOnline } = req.body;
    const partner = await DeliveryPartner.findOneAndUpdate(
      { user: req.user._id },
      { isOnline },
      { new: true }
    );

    res.json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
