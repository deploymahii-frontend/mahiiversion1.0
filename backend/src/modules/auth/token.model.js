import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    token: {
      type: String,
      required: true,
      unique: true
    },

    type: {
      type: String,
      enum: [
        "REFRESH",
        "RESET_PASSWORD",
        "EMAIL_VERIFY"
      ],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Token",
  tokenSchema
);
