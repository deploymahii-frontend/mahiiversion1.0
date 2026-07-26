import mongoose from "mongoose";

const DeliveryItemSchema = new mongoose.Schema(
{
    salesOrderItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

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

    orderedQuantity: {
        type: Number,
        required: true
    },

    deliveredQuantity: {
        type: Number,
        required: true
    }

},
{
    _id: false
});

const DeliverySchema = new mongoose.Schema({

    deliveryNumber: {

        type: String,

        required: true,

        unique: true,

        index: true

    },

    salesOrder: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "SalesOrder",

        required: true

    },

    customer: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Customer",

        required: true

    },

    warehouse: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Warehouse"

    },

    deliveryDate: {

        type: Date,

        default: Date.now

    },

    items: {

        type: [DeliveryItemSchema],

        required: true

    },

    transporter: {

        type: String,

        default: ""

    },

    vehicleNumber: {

        type: String,

        default: ""

    },

    trackingNumber: {

        type: String,

        default: ""

    },

    remarks: {

        type: String,

        default: ""

    },

    status: {

        type: String,

        default: "PENDING"

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "Delivery",
    DeliverySchema
);
