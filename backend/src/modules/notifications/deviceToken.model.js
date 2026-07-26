import mongoose from "mongoose";

const deviceTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ["android", "ios", "web"],
      default: "web",
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
    appVersion: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

deviceTokenSchema.index({ user: 1, deviceId: 1 }, { unique: true });

deviceTokenSchema.index({ token: 1 });

export default mongoose.model("DeviceToken", deviceTokenSchema);
