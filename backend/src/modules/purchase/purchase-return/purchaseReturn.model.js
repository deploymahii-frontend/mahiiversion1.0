import mongoose from "mongoose";

const PurchaseReturnItemSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    unitPrice: {
        type: Number,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    lineTotal: {
        type: Number,
        required: true
    }

},
{
    _id: false
});

const PurchaseReturnSchema = new mongoose.Schema(
{
    returnNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    purchaseOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder",
        required: true
    },

    purchaseInvoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseInvoice",
        required: true
    },

    grn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GRN",
        required: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    returnDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "DRAFT"
    },

    items: [PurchaseReturnItemSchema],

    totalAmount: {
        type: Number,
        default: 0
    },

    remarks: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

export default mongoose.model(
    "PurchaseReturn",
    PurchaseReturnSchema
);
