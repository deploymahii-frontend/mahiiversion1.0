import mongoose from "mongoose";
import { MOMENT_STATUS, MOMENT_TYPE, CREATOR_TYPE } from "./moment.constants.js";

const momentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    creatorType: {
      type: String,
      enum: Object.values(CREATOR_TYPE),
      default: CREATOR_TYPE.CUSTOMER,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
      index: true,
    },

    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
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
      maxlength: 2200,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      maxlength: 200,
      trim: true,
      index: true,
    },

    hashtags: {
      type: [String],
      default: [],
      index: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
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

    commentsCount: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    savesCount: {
      type: Number,
      default: 0,
    },

    shopClicks: {
      type: Number,
      default: 0,
    },

    productClicks: {
      type: Number,
      default: 0,
    },

    cartAdditions: {
      type: Number,
      default: 0,
    },

    orderGenerated: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: Object.values(MOMENT_STATUS),
      default: MOMENT_STATUS.PUBLISHED,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

momentSchema.index({ status: 1, createdAt: -1 });
momentSchema.index({ shop: 1, status: 1, createdAt: -1 });
momentSchema.index({ creator: 1, status: 1 });

export default mongoose.model("Moment", momentSchema);
