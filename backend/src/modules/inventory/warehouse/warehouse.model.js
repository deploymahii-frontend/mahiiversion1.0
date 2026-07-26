import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema(
{
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },

    contactNumber: {
        type: String
    },

    email: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

WarehouseSchema.index({
    code: 1
});

WarehouseSchema.index({
    name: 1
});

export default mongoose.model(
    "Warehouse",
    WarehouseSchema
);
