import * as repository from "./auth.repository.js";
import { generateAccessToken } from "./jwt.service.js";

export async function signup(data) {
  const emailExists = await repository.findByEmail(data.email);

  if (emailExists) {
    throw new Error("Email already exists");
  }

  const mobileExists = await repository.findByMobile(data.mobile);

  if (mobileExists) {
    throw new Error("Mobile number already exists");
  }

  const user = await repository.createUser(data);

  const token = generateAccessToken(user);

  return {
    token,
    user,
  };
}

export async function login({ email, password }) {
  const user = await repository.findByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateAccessToken(user);

  user.lastLogin = new Date();
  await user.save();

  return {
    token,
    user,
  };
}
