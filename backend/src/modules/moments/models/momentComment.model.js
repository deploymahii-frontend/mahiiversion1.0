import mongoose from "mongoose";

const momentCommentSchema = new mongoose.Schema(
  {
    moment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Moment",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MomentComment",
      default: null,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "HIDDEN", "REMOVED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

momentCommentSchema.index({ moment: 1, createdAt: -1 });

export default mongoose.model("MomentComment", momentCommentSchema);
