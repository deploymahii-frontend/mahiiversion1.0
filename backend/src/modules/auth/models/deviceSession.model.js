import mongoose from "mongoose";

const DeviceSessionSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true

    },

    deviceId: {

        type: String,

        required: true,

        index: true

    },

    deviceName: {

        type: String,

        default: ""

    },

    browser: {

        type: String,

        default: ""

    },

    operatingSystem: {

        type: String,

        default: ""

    },

    ipAddress: {

        type: String,

        default: ""

    },

    location: {

        type: String,

        default: ""

    },

    lastActivity: {

        type: Date,

        default: Date.now

    },

    active: {

        type: Boolean,

        default: true

    }

},
{
    timestamps: true
});

export default mongoose.model(
    "DeviceSession",
    DeviceSessionSchema
);
