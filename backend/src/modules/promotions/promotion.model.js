import mongoose from "mongoose";
import { PROMOTION_STATUS } from "./promotion.constants.js";

const promotionSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    budget: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    views: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: PROMOTION_STATUS.PENDING,
      enum: Object.values(PROMOTION_STATUS),
    },
  },
  {
    timestamps: true,
  }
);

promotionSchema.index({ shop: 1 });

export default mongoose.model("Promotion", promotionSchema);
