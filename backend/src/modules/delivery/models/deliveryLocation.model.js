import mongoose from "mongoose";

const deliveryLocationSchema = new mongoose.Schema({
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPartner",
    required: true,
    index: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryAssignment",
  },
  latitude: Number,
  longitude: Number,
  heading: Number,
  speed: Number,
  accuracy: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DeliveryLocation", deliveryLocationSchema);
