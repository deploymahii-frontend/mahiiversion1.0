import mongoose from "mongoose";

const CustomerPaymentAllocationSchema = new mongoose.Schema(
{
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalesInvoice",
        required: true
    },

    invoiceNumber: {
        type: String,
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

const CustomerPaymentSchema = new mongoose.Schema({

    paymentNumber: {

        type: String,

        required: true,

        unique: true,

        index: true

    },

    customer: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Customer",

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

    amount: {

        type: Number,

        required: true

    },

    allocations: {

        type: [CustomerPaymentAllocationSchema],

        default: []

    },

    notes: {

        type: String,

        default: ""

    },

    status: {

        type: String,

        default: "POSTED"

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "CustomerPayment",
    CustomerPaymentSchema
);
