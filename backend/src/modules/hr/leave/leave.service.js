import leaveRepository from "./leave.repository.js";
import employeeRepository from "../employees/employee.repository.js";
import { toLeaveResponse } from "./leave.mapper.js";

/*
|--------------------------------------------------------------------------
| Apply Leave
|--------------------------------------------------------------------------
*/

export async function applyLeave(data) {

    const employee =
        await employeeRepository.findById(data.employee);

    if (!employee) {
        throw new Error("Employee not found.");
    }

    const fromDate = new Date(data.fromDate);
    const toDate = new Date(data.toDate);

    if (toDate < fromDate) {
        throw new Error("Invalid leave dates.");
    }

    const totalDays =
        Math.ceil(
            (toDate - fromDate) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    const leave =
        await leaveRepository.create({

            ...data,

            totalDays

        });

    return toLeaveResponse(leave);

}

/*
|--------------------------------------------------------------------------
| Approve Leave
|--------------------------------------------------------------------------
*/

export async function approveLeave(id, approvedBy) {

    const leave =
        await leaveRepository.findById(id);

    if (!leave) {

        throw new Error("Leave request not found.");

    }

    const updated =
        await leaveRepository.approve(
            id,
            approvedBy
        );

    return toLeaveResponse(updated);

}

/*
|--------------------------------------------------------------------------
| Reject Leave
|--------------------------------------------------------------------------
*/

export async function rejectLeave(
    id,
    approvedBy,
    rejectionReason
) {

    const leave =
        await leaveRepository.findById(id);

    if (!leave) {

        throw new Error("Leave request not found.");

    }

    const updated =
        await leaveRepository.reject(
            id,
            approvedBy,
            rejectionReason
        );

    return toLeaveResponse(updated);

}

/*
|--------------------------------------------------------------------------
| Cancel Leave
|--------------------------------------------------------------------------
*/

export async function cancelLeave(id) {

    const leave =
        await leaveRepository.findById(id);

    if (!leave) {

        throw new Error("Leave request not found.");

    }

    const updated =
        await leaveRepository.cancel(id);

    return toLeaveResponse(updated);

}

/*
|--------------------------------------------------------------------------
| Employee Leave History
|--------------------------------------------------------------------------
*/

export async function getEmployeeLeaves(employeeId) {

    const leaves = await leaveRepository.findByEmployee(
        employeeId
    );

    return leaves.map(toLeaveResponse);

}

/*
|--------------------------------------------------------------------------
| Pending Leaves
|--------------------------------------------------------------------------
*/

export async function getPendingLeaves() {

    const leaves = await leaveRepository.findPending();

    return leaves.map(toLeaveResponse);

}

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

export async function getLeaveStatistics() {

    return leaveRepository.statistics();

}

/*
|--------------------------------------------------------------------------
| Leave List
|--------------------------------------------------------------------------
*/

export async function getLeaveList(page, limit) {

    return leaveRepository.paginate(
        {},
        page,
        limit
    );

}

export async function getLeave(id) {

    const leave =
        await leaveRepository.findById(id);

    if (!leave) {

        throw new Error("Leave request not found.");

    }

    return toLeaveResponse(leave);

}
