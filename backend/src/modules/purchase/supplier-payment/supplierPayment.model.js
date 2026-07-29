import mongoose from "mongoose";

const PaymentAllocationSchema = new mongoose.Schema(
{
    purchaseInvoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseInvoice",
        required: true
    },

    allocatedAmount: {
        type: Number,
        required: true,
        min: 0
    }

},
{
    _id: false
});

const SupplierPaymentSchema = new mongoose.Schema(
{
    paymentNumber: {
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

    paymentDate: {
        type: Date,
        default: Date.now
    },

    paymentMethod: {
        type: String,
        required: true
    },

    referenceNumber: {
        type: String,
        default: ""
    },

    bankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount"
    },

    totalAmount: {
        type: Number,
        required: true
    },

    allocations: [PaymentAllocationSchema],

    remarks: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "PENDING"
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
    "SupplierPayment",
    SupplierPaymentSchema
);
