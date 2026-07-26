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
      enum: ["BIKE", "SCOOTER", "BICYCLE"],
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    drivingLicense: {
      type: String,
      default: "",
    },
    aadhaarNumber: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
      min: 0,
    },
    walletBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DeliveryPartner", deliveryPartnerSchema);
