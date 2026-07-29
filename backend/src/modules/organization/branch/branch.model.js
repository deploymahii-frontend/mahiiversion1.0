import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
{
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    code: {
        type: String,
        required: true
    },

    email: String,

    phone: String,

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    address: {

        line1: String,

        line2: String,

        city: String,

        state: String,

        country: String,

        pincode: String

    },

    location: {

        latitude: Number,

        longitude: Number

    },

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
    "Branch",
    BranchSchema
);
