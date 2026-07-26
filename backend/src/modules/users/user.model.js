import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    mobile: {
        type: String,
        unique: true,
        sparse: true,
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    failedLoginAttempts: {
        type: Number,
        default: 0
    },

    deletedAt: {
        type: Date,
        default: null
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },

    permissions: [{
        type: String
    }],

    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED"],
        default: "ACTIVE"
    }

},
{
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

