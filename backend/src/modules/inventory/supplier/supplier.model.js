import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
{
    supplierCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true
    },

    companyName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    contactPerson: {
        type: String,
        required: true,
        trim: true
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
        uppercase: true,
        trim: true
    },

    panNumber: {
        type: String,
        uppercase: true,
        trim: true
    },

    address: {

        line1: String,

        line2: String,

        city: String,

        state: String,

        country: String,

        postalCode: String

    },

    paymentTerms: {
        type: Number,
        default: 30
    },

    creditLimit: {
        type: Number,
        default: 0
    },

    notes: {
        type: String,
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

SupplierSchema.index({
    companyName: 1
});

export default mongoose.model(
    "Supplier",
    SupplierSchema
);
