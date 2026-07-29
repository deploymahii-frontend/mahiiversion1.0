import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    moment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Moment",
      default: null,
    },

    type: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    reason: {
      type: String,
      default: "",
      trim: true,
    },

    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

rewardSchema.index({ creator: 1, createdAt: -1 });

export default mongoose.model("Reward", rewardSchema);
