import mongoose from "mongoose";

const momentSocialSchema = new mongoose.Schema(
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
      index: true,
    },
    type: {
      type: String,
      enum: ["LIKE", "SAVE", "FOLLOW", "COMMENT"],
      required: true,
    },
    value: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

momentSocialSchema.index({ moment: 1, user: 1, type: 1 }, { unique: true });

export default mongoose.model("MomentSocial", momentSocialSchema);
