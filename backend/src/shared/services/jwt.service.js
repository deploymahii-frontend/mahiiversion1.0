import jwt from "jsonwebtoken";
import config from "../../config/server.config.js";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export function generateAccessToken(user) {
    return jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
}

export function generateRefreshToken(user) {
    return jwt.sign({ id: user._id }, config.jwt.secret, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
}

export function verifyAccessToken(token) {
    return jwt.verify(token, config.jwt.secret);
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, config.jwt.secret);
}
