import mongoose from "mongoose";

const QuotationItemSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    productCode: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },

    discount: {
        type: Number,
        default: 0
    },

    tax: {
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

const QuotationSchema = new mongoose.Schema(
{

    quotationNumber: {

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

    quotationDate: {

        type: Date,

        default: Date.now

    },

    validUntil: {

        type: Date,

        required: true

    },

    items: {

        type: [QuotationItemSchema],

        required: true

    },

    subtotal: {

        type: Number,

        default: 0

    },

    discountTotal: {

        type: Number,

        default: 0

    },

    taxTotal: {

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

    status: {

        type: String,

        default: "DRAFT"

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "Quotation",
    QuotationSchema
);
