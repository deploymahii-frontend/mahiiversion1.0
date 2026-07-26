import mongoose from "mongoose";
import {
  CART_DEFAULTS,
  DELIVERY_TYPE,
} from "./cart.constants.js";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    deliveryType: {
      type: String,
      enum: Object.values(DELIVERY_TYPE),
      default: DELIVERY_TYPE.PICKUP,
    },

    coupon: {
      type: String,
      default: "",
      trim: true,
    },

    subTotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: CART_DEFAULTS.DISCOUNT,
    },

    tax: {
      type: Number,
      default: CART_DEFAULTS.TAX,
    },

    deliveryCharge: {
      type: Number,
      default: CART_DEFAULTS.DELIVERY_CHARGE,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ updatedAt: -1 });

cartSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Cart", cartSchema);
