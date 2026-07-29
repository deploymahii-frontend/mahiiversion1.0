import mongoose from "mongoose";

const PurchaseInvoiceItemSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unitPrice: {
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

const PurchaseInvoiceSchema = new mongoose.Schema(
{
    invoiceNumber: {
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

    grn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GRN",
        required: true
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    invoiceDate: {
        type: Date,
        default: Date.now
    },

    dueDate: {
        type: Date
    },

    status: {
        type: String,
        default: "PENDING"
    },

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

    grandTotal: {
        type: Number,
        default: 0
    },

    items: [PurchaseInvoiceItemSchema],

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
    "PurchaseInvoice",
    PurchaseInvoiceSchema
);
