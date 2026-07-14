import User from "../users/user.model.js";

export const findByEmail = (email) =>
  User.findOne({ email }).select("+password");

export const findByEmailWithPassword = (email) =>
  User.findOne({ email }).select("+password");

export const findByMobile = (mobile) =>
  User.findOne({ mobile });

export const createUser = (data) =>
  User.create(data);
