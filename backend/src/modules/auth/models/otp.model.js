import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    email: String,

    phone: String,

    code: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        enum: [
            "LOGIN",
            "EMAIL_VERIFICATION",
            "PASSWORD_RESET"
        ],
        required: true
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

OtpSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export default mongoose.model(
    "Otp",
    OtpSchema
);
