import mongoose from "mongoose";

const LoginHistorySchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    ipAddress: String,

    browser: String,

    operatingSystem: String,

    deviceId: String,

    status: {

        type: String,

        enum: [

            "SUCCESS",

            "FAILED"

        ],

        required: true

    },

    reason: {

        type: String,

        default: ""

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "LoginHistory",
    LoginHistorySchema
);
