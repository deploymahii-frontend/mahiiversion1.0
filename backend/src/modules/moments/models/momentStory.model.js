import mongoose from "mongoose";

const momentStorySchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
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
    caption: {
      type: String,
      default: "",
      maxlength: 500,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// TTL index to auto-expire stories 24 hours (86400 seconds) after creation
momentStorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.model("MomentStory", momentStorySchema);
