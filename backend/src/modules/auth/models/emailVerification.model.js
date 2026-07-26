import mongoose from "mongoose";

const EmailVerificationSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    token: {

        type: String,

        required: true,

        unique: true

    },

    expiresAt: {

        type: Date,

        required: true

    },

    verified: {

        type: Boolean,

        default: false

    }

}, {
    timestamps: true
});

EmailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default mongoose.model(
    "EmailVerification",
    EmailVerificationSchema
);
