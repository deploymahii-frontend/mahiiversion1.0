import mongoose from "mongoose";

import employeeRepository from "./employee.repository.js";
import userRepository from "../../users/user.repository.js";

import { toEmployeeResponse } from "./employee.mapper.js";

export async function createEmployee(data) {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const employeeExists =
            await employeeRepository.findByEmployeeCode(
                data.employeeCode
            );

        if (employeeExists) {

            throw new Error(
                "Employee Code already exists."
            );

        }

        const user =
            await userRepository.findById(data.user);

        if (!user) {

            throw new Error(
                "User not found."
            );

        }

        const employee =
            await employeeRepository.create(
                data,
                { session }
            );

        await session.commitTransaction();

        return toEmployeeResponse(employee);

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

}

export async function updateEmployee(id, data) {

    const employee =
        await employeeRepository.findById(id);

    if (!employee) {

        throw new Error(
            "Employee not found."
        );

    }

    const updated =
        await employeeRepository.update(
            id,
            data
        );

    return toEmployeeResponse(updated);

}

export async function getEmployee(id) {

    const employee =
        await employeeRepository.findById(id);

    if (!employee) {

        throw new Error(
            "Employee not found."
        );

    }

    return toEmployeeResponse(employee);

}

export async function getEmployees(page, limit) {

    return employeeRepository.paginate(
        {},
        page,
        limit
    );

}

export async function searchEmployees(search) {

    return employeeRepository.search(search);

}

export async function getEmployeeStatistics() {

    return employeeRepository.statistics();

}

export async function generateEmployeeCode() {

    const stats =
        await employeeRepository.statistics();

    const next =
        stats.total + 1;

    return `EMP${String(next).padStart(6, "0")}`;

}

export async function activateEmployee(id) {

    return employeeRepository.activate(id);

}

export async function terminateEmployee(id) {

    return employeeRepository.terminate(id);

}

export async function resignEmployee(
    id,
    relievingDate
) {

    return employeeRepository.resign(
        id,
        relievingDate
    );

}
