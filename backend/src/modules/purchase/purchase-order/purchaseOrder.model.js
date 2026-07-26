import mongoose from "mongoose";

const PurchaseOrderItemSchema = new mongoose.Schema(
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

    receivedQuantity: {
        type: Number,
        default: 0
    },

    purchasePrice: {
        type: Number,
        required: true
    },

    taxPercentage: {
        type: Number,
        default: 0
    },

    discountPercentage: {
        type: Number,
        default: 0
    },

    lineTotal: {
        type: Number,
        required: true
    }

},
{
    _id: false
});

const PurchaseOrderSchema = new mongoose.Schema(
{
    poNumber: {
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

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    expectedDeliveryDate: {
        type: Date
    },

    status: {
        type: String,
        default: "DRAFT"
    },

    items: [PurchaseOrderItemSchema],

    subtotal: {
        type: Number,
        default: 0
    },

    discountAmount: {
        type: Number,
        default: 0
    },

    taxAmount: {
        type: Number,
        default: 0
    },

    shippingAmount: {
        type: Number,
        default: 0
    },

    grandTotal: {
        type: Number,
        default: 0
    },

    notes: {
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

PurchaseOrderSchema.index({
    supplier: 1
});

PurchaseOrderSchema.index({
    warehouse: 1
});

export default mongoose.model(
    "PurchaseOrder",
    PurchaseOrderSchema
);
