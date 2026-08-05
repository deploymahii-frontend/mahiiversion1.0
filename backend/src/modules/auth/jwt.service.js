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
  const secret = process.env.JWT_SECRET || "dev-access-secret";
  return jwt.sign(buildTokenPayload(payload), secret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload) {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "dev-access-secret";
  return jwt.sign(buildTokenPayload(payload), secret, {
    expiresIn: "30d",
  });
}

export function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET || "dev-access-secret";
  return jwt.verify(token, secret);
}

export function verifyRefreshToken(token) {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "dev-access-secret";
  return jwt.verify(token, secret);
}

export const signAccessToken = generateAccessToken;
export const signRefreshToken = generateRefreshToken;
