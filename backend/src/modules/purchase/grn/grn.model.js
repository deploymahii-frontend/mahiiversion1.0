import mongoose from "mongoose";

const GRNItemSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    purchaseOrderItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    orderedQuantity: {
        type: Number,
        required: true
    },

    receivedQuantity: {
        type: Number,
        required: true
    },

    acceptedQuantity: {
        type: Number,
        required: true
    },

    rejectedQuantity: {
        type: Number,
        default: 0
    },

    purchasePrice: {
        type: Number,
        required: true
    },

    remarks: {
        type: String,
        default: ""
    }

},
{
    _id: false
});

const GRNSchema = new mongoose.Schema(
{
    grnNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    purchaseOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder",
        required: true
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    receivedDate: {
        type: Date,
        default: Date.now
    },

    invoiceNumber: {
        type: String,
        default: ""
    },

    vehicleNumber: {
        type: String,
        default: ""
    },

    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [GRNItemSchema],

    remarks: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

GRNSchema.index({
    purchaseOrder: 1
});

export default mongoose.model(
    "GRN",
    GRNSchema
);
