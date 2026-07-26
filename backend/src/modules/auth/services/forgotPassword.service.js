import crypto from "crypto";

import PasswordReset from "../models/passwordReset.model.js";

export async function createResetToken(userId) {

    const token = crypto
        .randomBytes(32)
        .toString("hex");

    const expiresAt = new Date(
        Date.now() + 30 * 60 * 1000
    );

    await PasswordReset.create({

        user: userId,

        token,

        expiresAt

    });

    return token;

}

export async function validateResetToken(token) {

    const reset = await PasswordReset.findOne({

        token,

        used: false

    });

    if (!reset) {

        throw new Error(
            "Invalid reset token."
        );

    }

    if (reset.expiresAt < new Date()) {

        throw new Error(
            "Reset token expired."
        );

    }

    return reset;

}

export async function markTokenUsed(id) {

    return PasswordReset.findByIdAndUpdate(

        id,

        {

            used: true

        }

    );

}
