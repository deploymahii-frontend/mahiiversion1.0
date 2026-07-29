import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema(
{
    module: {
        type: String,
        required: true,
    },

    action: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Audit", AuditSchema);
