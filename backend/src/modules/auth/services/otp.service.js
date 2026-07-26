import crypto from "crypto";
import Otp from "../models/otp.model.js";

export async function generateOtp(data) {

    const code = crypto
        .randomInt(100000, 999999)
        .toString();

    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );

    const otp = await Otp.create({

        ...data,

        code,

        expiresAt

    });

    return otp;

}

export async function verifyOtp({

    email,

    phone,

    purpose,

    code

}) {

    const otp = await Otp.findOne({

        email,

        phone,

        purpose,

        code,

        verified: false

    });

    if (!otp) {

        throw new Error(
            "Invalid OTP."
        );

    }

    if (otp.expiresAt < new Date()) {

        throw new Error(
            "OTP expired."
        );

    }

    otp.verified = true;

    await otp.save();

    return otp;

}
