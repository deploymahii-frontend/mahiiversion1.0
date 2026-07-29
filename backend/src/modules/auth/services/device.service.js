import DeviceSession from "../models/deviceSession.model.js";

export async function registerDevice(data) {

    return DeviceSession.findOneAndUpdate(

        {

            user: data.user,

            deviceId: data.deviceId

        },

        {

            ...data,

            active: true,

            lastActivity: new Date()

        },

        {

            new: true,

            upsert: true

        }

    );

}

export async function updateLastActivity(deviceId) {

    return DeviceSession.findOneAndUpdate(

        {

            deviceId,

            active: true

        },

        {

            lastActivity: new Date()

        }

    );

}

export async function getUserDevices(userId) {

    return DeviceSession.find({

        user: userId,

        active: true

    }).sort({

        lastActivity: -1

    });

}

export async function logoutDevice(deviceId) {

    return DeviceSession.findOneAndUpdate(

        {

            deviceId

        },

        {

            active: false

        }

    );

}

export async function logoutAllDevices(userId) {

    return DeviceSession.updateMany(

        {

            user: userId,

            active: true

        },

        {

            active: false

        }

    );

}
