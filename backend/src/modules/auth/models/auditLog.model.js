import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },

    action: {

        type: String,

        required: true

    },

    module: {

        type: String,

        required: true

    },

    ipAddress: String,

    deviceId: String,

    metadata: {

        type: Object,

        default: {}

    }

}, {
    timestamps: true
});

export default mongoose.model(
    "AuditLog",
    AuditLogSchema
);
