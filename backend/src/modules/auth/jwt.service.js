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

export function generateAccessToken(payload) {
  return jwt.sign(buildTokenPayload(payload), process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload) {
  return jwt.sign(buildTokenPayload(payload), process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export const signAccessToken = generateAccessToken;
export const signRefreshToken = generateRefreshToken;
