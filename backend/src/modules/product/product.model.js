import mongoose from "mongoose";
import {
  PRODUCT_STATUS,
  PRODUCT_CATEGORIES,
  FOOD_TYPE,
  PRODUCT_DEFAULTS,
} from "./product.constants.js";

const productSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      default: "Other",
    },

    foodType: {
      type: String,
      enum: Object.values(FOOD_TYPE),
      default: FOOD_TYPE.VEG,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    preparationTime: {
      type: Number,
      default: PRODUCT_DEFAULTS.PREPARATION_TIME,
    },

    tags: {
      type: [String],
      default: [],
    },

    searchKeywords: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: PRODUCT_DEFAULTS.RATING,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: PRODUCT_DEFAULTS.TOTAL_REVIEWS,
    },

    totalOrders: {
      type: Number,
      default: PRODUCT_DEFAULTS.TOTAL_ORDERS,
    },

    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.ACTIVE,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ shop: 1 });
productSchema.index({ owner: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ name: "text", description: "text", tags: "text" });

productSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Product", productSchema);
