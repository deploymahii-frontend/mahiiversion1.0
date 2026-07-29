import mongoose from "mongoose";
import { OFFER_STATUS, OFFER_TYPES } from "./offer.constants.js";

const offerSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    type: {
      type: String,
      enum: OFFER_TYPES,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    minimumOrder: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    banner: {
      type: String,
      default: "",
    },

    validFrom: {
      type: Date,
      required: true,
    },

    validTill: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(OFFER_STATUS),
      default: OFFER_STATUS.DRAFT,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalClaims: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.index({ shop: 1, status: 1 });
offerSchema.index({ validTill: 1 });

offerSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Offer", offerSchema);
