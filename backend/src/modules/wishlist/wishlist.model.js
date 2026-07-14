import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index(
  { customer: 1, shop: 1 },
  { unique: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
