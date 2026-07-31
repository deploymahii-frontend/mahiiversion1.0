import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ["BIKE", "SCOOTER", "BICYCLE", "CAR"],
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
    rating: {
      type: Number,
      default: 5,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);
