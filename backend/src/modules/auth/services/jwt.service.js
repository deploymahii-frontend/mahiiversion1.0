import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES = "30d";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      phone: user.phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      tokenType: "refresh",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
