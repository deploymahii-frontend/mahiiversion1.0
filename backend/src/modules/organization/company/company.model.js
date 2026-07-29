import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true
    },

    phone: String,

    website: String,

    gstNumber: String,

    panNumber: String,

    cinNumber: String,

    address: {

        line1: String,

        line2: String,

        city: String,

        state: String,

        country: String,

        pincode: String

    },

    logo: String,

    status: {

        type: String,

        enum: [
            "ACTIVE",
            "INACTIVE"
        ],

        default: "ACTIVE"

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "Company",
    CompanySchema
);
