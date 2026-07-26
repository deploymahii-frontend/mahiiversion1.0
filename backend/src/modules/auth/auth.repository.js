import mongoose from "mongoose";
import { ACCOUNT_STATUS } from "../../shared/constants/account-status.js";
import User from "../users/user.model.js";

const activeFilter = {
    deletedAt: null,
    status: { $ne: ACCOUNT_STATUS.DELETED },
};

export async function findByEmail(email) {
    return User.findOne({ email, ...activeFilter }).populate("role");
}

export async function findByEmailWithPassword(email) {
    return User.findOne({ email, ...activeFilter })
        .select("+password")
        .populate("role");
}

export async function createUser(data, session = null) {
    const user = new User(data);
    return user.save({ session });
}

export async function findById(id) {
    return User.findOne({ _id: id, ...activeFilter }).populate("role");
}

export async function findByIdWithPassword(id) {
    return User.findOne({ _id: id, ...activeFilter })
        .select("+password")
        .populate("role");
}

export async function updateLastLogin(id) {
    return User.findByIdAndUpdate(
        id,
        {
            lastLogin: new Date(),
            failedLoginAttempts: 0,
        },
        {
            new: true,
        }
    );
}

export async function incrementFailedLoginAttempts(id) {
    return User.findByIdAndUpdate(
        id,
        { $inc: { failedLoginAttempts: 1 } },
        { new: true }
    );
}

export async function resetFailedLoginAttempts(id) {
    return User.findByIdAndUpdate(
        id,
        { failedLoginAttempts: 0 },
        { new: true }
    );
}
