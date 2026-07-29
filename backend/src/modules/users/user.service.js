import mongoose from "mongoose";

import userRepository from "./user.repository.js";
import roleRepository from "../roles/role.repository.js";

import { hashPassword } from "../../shared/services/password.service.js";

import { toUserResponse } from "./user.mapper.js";

export async function createUser(data) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const emailExists =
            await userRepository.findByEmail(data.email);

        if (emailExists) {
            throw new Error("Email already exists.");
        }

        const mobileExists =
            await userRepository.findByMobile(data.mobile);

        if (mobileExists) {
            throw new Error("Mobile already exists.");
        }

        if (data.employeeCode) {

            const employeeExists =
                await userRepository.findByEmployeeCode(
                    data.employeeCode
                );

            if (employeeExists) {
                throw new Error("Employee code already exists.");
            }

        } else {

            data.employeeCode =
                await generateEmployeeCode();

        }

        if (data.password) {

            data.password =
                await hashPassword(data.password);

        }

        const role =
            await roleRepository.findById(data.role);

        if (!role) {

            throw new Error("Role not found.");

        }

        const user =
            await userRepository.create(data, { session });

        await session.commitTransaction();

        return toUserResponse(user);

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

}

export async function generateEmployeeCode() {

    const statistics =
        await userRepository.getStatistics();

    const next =
        statistics.total + 1;

    return `EMP${String(next).padStart(6, "0")}`;

}

export async function getUser(id) {

    const user =
        await userRepository.findById(id);

    if (!user) {

        throw new Error("User not found.");

    }

    return toUserResponse(user);

}

export async function searchUsers(query) {

    return userRepository.search(query);

}

export async function getUsers(page, limit) {

    return userRepository.paginate(

        {},

        page,

        limit

    );

}

export async function updateUser(id, data) {

    const user = await userRepository.findById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    if (data.email && data.email !== user.email) {

        const exists =
            await userRepository.findByEmail(data.email);

        if (exists) {
            throw new Error("Email already exists.");
        }
    }

    if (data.mobile && data.mobile !== user.mobile) {

        const exists =
            await userRepository.findByMobile(data.mobile);

        if (exists) {
            throw new Error("Mobile already exists.");
        }
    }

    const updated =
        await userRepository.update(id, data);

    return toUserResponse(updated);

}

export async function activateUser(id) {

    const user =
        await userRepository.updateStatus(
            id,
            "ACTIVE"
        );

    if (!user) {
        throw new Error("User not found.");
    }

    return toUserResponse(user);

}

export async function suspendUser(id) {

    const user =
        await userRepository.updateStatus(
            id,
            "SUSPENDED"
        );

    if (!user) {
        throw new Error("User not found.");
    }

    return toUserResponse(user);

}

export async function deleteUser(id) {

    const user =
        await userRepository.softDelete(id);

    if (!user) {
        throw new Error("User not found.");
    }

    return {
        success: true
    };

}

export async function updateProfile(
    userId,
    data
) {

    delete data.role;
    delete data.permissions;
    delete data.status;

    const user =
        await userRepository.update(
            userId,
            data
        );

    return toUserResponse(user);

}

export async function getDashboardStatistics() {

    return userRepository.getStatistics();

}

export async function bulkImport(users) {

    const prepared = [];

    for (const user of users) {

        if (user.password) {
            user.password =
                await hashPassword(user.password);
        }

        if (!user.employeeCode) {
            user.employeeCode =
                await generateEmployeeCode();
        }

        prepared.push(user);

    }

    return userRepository.bulkInsert(prepared);

}
