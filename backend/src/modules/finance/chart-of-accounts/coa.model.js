import mongoose from "mongoose";

const COASchema = new mongoose.Schema(
{
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChartOfAccount",
        default: null
    },

    isGroup: {
        type: Boolean,
        default: false
    },

    active: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

export default mongoose.model(
    "ChartOfAccount",
    COASchema
);
