import mongoose from "mongoose";
import { MOMENT_STATUS, MOMENT_TYPE } from "./moment.constants.js";

const momentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },

    title: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 1000,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(MOMENT_TYPE),
      default: MOMENT_TYPE.FOOD_REVIEW,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    shopClicks: {
      type: Number,
      default: 0,
    },

    orderGenerated: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(MOMENT_STATUS),
      default: MOMENT_STATUS.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

momentSchema.index({ creator: 1 });
momentSchema.index({ shop: 1 });

export default mongoose.model("Moment", momentSchema);
