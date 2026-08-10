import mongoose from "mongoose";

const reviewReportSchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
      index: true,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reason: {
      type: String,
      enum: [
        "SPAM",
        "FAKE_REVIEW",
        "OFFENSIVE",
        "HARASSMENT",
        "WRONG_SHOP",
        "PROMOTIONAL",
        "OTHER",
      ],
      required: true,
    },
    details: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "RESOLVED", "DISMISSED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

reviewReportSchema.index({ review: 1, reporter: 1 }, { unique: true });

export default mongoose.model("ReviewReport", reviewReportSchema);
