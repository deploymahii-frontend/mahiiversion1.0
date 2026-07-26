import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({

    customerCode: {

        type: String,

        required: true,

        unique: true,

        index: true

    },

    name: {

        type: String,

        required: true

    },

    companyName: {

        type: String,

        default: ""

    },

    email: {

        type: String,

        lowercase: true,

        trim: true

    },

    phone: {

        type: String,

        required: true

    },

    gstNumber: {

        type: String,

        default: ""

    },

    panNumber: {

        type: String,

        default: ""

    },

    creditLimit: {

        type: Number,

        default: 0

    },

    outstandingAmount: {

        type: Number,

        default: 0

    },

    billingAddress: {

        address: String,

        city: String,

        state: String,

        country: String,

        postalCode: String

    },

    shippingAddress: {

        address: String,

        city: String,

        state: String,

        country: String,

        postalCode: String

    },

    status: {

        type: String,

        default: "ACTIVE"

    }

},
{
    timestamps: true
});

export default mongoose.model(

    "Customer",

    CustomerSchema

);
