import RefreshToken from "../models/refreshToken.model.js";

export async function saveRefreshToken({

    userId,

    token,

    deviceId,

    expiresAt

}) {

    return RefreshToken.create({

        user: userId,

        token,

        deviceId,

        expiresAt

    });

}

export async function findRefreshToken(token) {

    return RefreshToken.findOne({

        token,

        revoked: false

    });

}

export async function revokeRefreshToken(token) {

    return RefreshToken.findOneAndUpdate(

        {

            token

        },

        {

            revoked: true

        }

    );

}

export async function revokeAllUserTokens(userId) {

    return RefreshToken.updateMany(

        {

            user: userId,

            revoked: false

        },

        {

            revoked: true

        }

    );

}
