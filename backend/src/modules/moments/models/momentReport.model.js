import mongoose from "mongoose";

const momentReportSchema = new mongoose.Schema(
  {
    moment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Moment",
      required: true,
      index: true,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      enum: [
        "SPAM",
        "FAKE_CONTENT",
        "OFFENSIVE",
        "HARASSMENT",
        "ILLEGAL_CONTENT",
        "MISLEADING",
        "WRONG_PRODUCT",
        "OTHER",
      ],
      required: true,
    },
    details: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["PENDING", "RESOLVED", "DISMISSED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

momentReportSchema.index({ moment: 1, reporter: 1 }, { unique: true });

export default mongoose.model("MomentReport", momentReportSchema);
