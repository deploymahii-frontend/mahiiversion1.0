import mongoose from "mongoose";

const SalesOrderItemSchema = new mongoose.Schema(
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

    reservedQuantity: {
        type: Number,
        default: 0
    },

    deliveredQuantity: {
        type: Number,
        default: 0
    },

    invoicedQuantity: {
        type: Number,
        default: 0
    },

    unitPrice: {
        type: Number,
        required: true
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

const SalesOrderSchema = new mongoose.Schema({

    salesOrderNumber: {

        type: String,

        unique: true,

        required: true,

        index: true

    },

    quotation: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Quotation"

    },

    customer: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Customer",

        required: true

    },

    orderDate: {

        type: Date,

        default: Date.now

    },

    expectedDeliveryDate: {

        type: Date

    },

    items: {

        type: [SalesOrderItemSchema],

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

        default: "OPEN"

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "SalesOrder",
    SalesOrderSchema
);
