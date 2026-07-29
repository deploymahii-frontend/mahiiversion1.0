import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "ASSIGNED",
        "ACCEPTED",
        "PICKED_UP",
        "DELIVERED",
        "REJECTED",
        "EXPIRED",
      ],
      default: "ASSIGNED",
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
    acceptedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
    customerOTP: {
      type: String,
      default: "",
    },
    distance: {
      type: Number,
      default: 0,
      min: 0,
    },
    earnings: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);
