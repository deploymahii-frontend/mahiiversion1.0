import jwt from "jsonwebtoken";

function buildTokenPayload(payload) {
  if (!payload) {
    return {};
  }

  if (payload._id || payload.id) {
    return { id: payload._id || payload.id };
  }

  return payload;
}

const accessTokenSecret = process.env.JWT_SECRET || "dev-access-secret";
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || accessTokenSecret;

export function generateAccessToken(payload) {
  return jwt.sign(buildTokenPayload(payload), accessTokenSecret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(buildTokenPayload(payload), refreshTokenSecret, {
    expiresIn: "30d",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, accessTokenSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, refreshTokenSecret);
}

export const signAccessToken = generateAccessToken;
export const signRefreshToken = generateRefreshToken;
