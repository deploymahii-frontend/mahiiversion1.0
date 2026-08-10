import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    review: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    isVerifiedPurchase: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "REPORTED", "HIDDEN", "REMOVED"],
      default: "ACTIVE",
      index: true,
    },

    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    ownerReply: {
      comment: {
        type: String,
        trim: true,
        default: null,
      },
      repliedAt: {
        type: Date,
        default: null,
      },
      updatedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to enforce one review per customer order per shop
reviewSchema.index({ customer: 1, shop: 1, order: 1 }, { unique: true });

// Compound index for querying active reviews by shop ordered by creation date
reviewSchema.index({ shop: 1, status: 1, createdAt: -1 });

export default mongoose.model("Review", reviewSchema);
