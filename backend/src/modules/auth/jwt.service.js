import jwt from "jsonwebtoken";
import config from "../../config/server.config.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};
