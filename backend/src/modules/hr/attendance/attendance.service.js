import attendanceRepository from "./attendance.repository.js";
import employeeRepository from "../employees/employee.repository.js";
import { toAttendanceResponse } from "./attendance.mapper.js";

/*
|--------------------------------------------------------------------------
| Employee Check In
|--------------------------------------------------------------------------
*/

export async function checkIn(employeeId, data) {

    const employee =
        await employeeRepository.findById(employeeId);

    if (!employee) {
        throw new Error("Employee not found.");
    }

    const attendance =
        await attendanceRepository.checkIn(
            employeeId,
            data.date,
            new Date()
        );

    return toAttendanceResponse(attendance);
}

/*
|--------------------------------------------------------------------------
| Employee Check Out
|--------------------------------------------------------------------------
*/

export async function checkOut(attendanceId) {

    const attendance =
        await attendanceRepository.findById(attendanceId);

    if (!attendance) {
        throw new Error("Attendance not found.");
    }

    if (!attendance.checkIn) {
        throw new Error("Check-In not found.");
    }

    const checkOutTime = new Date();

    const workingHours =
        (
            checkOutTime -
            attendance.checkIn
        ) / (1000 * 60 * 60);

    const updated =
        await attendanceRepository.checkOut(
            attendanceId,
            checkOutTime,
            Number(workingHours.toFixed(2))
        );

    return toAttendanceResponse(updated);
}

/*
|--------------------------------------------------------------------------
| Attendance Details
|--------------------------------------------------------------------------
*/

export async function getAttendance(id) {

    const attendance =
        await attendanceRepository.findById(id);

    if (!attendance) {
        throw new Error("Attendance not found.");
    }

    return toAttendanceResponse(attendance);
}

/*
|--------------------------------------------------------------------------
| Employee Attendance
|--------------------------------------------------------------------------
*/

export async function getEmployeeAttendance(employeeId) {

    return attendanceRepository.findByEmployee(employeeId);

}

/*
|--------------------------------------------------------------------------
| Attendance List
|--------------------------------------------------------------------------
*/

export async function getAttendanceList(page, limit) {

    return attendanceRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Attendance Statistics
|--------------------------------------------------------------------------
*/

export async function getAttendanceStatistics() {

    return attendanceRepository.statistics();

}

/*
|--------------------------------------------------------------------------
| Monthly Attendance Report
|--------------------------------------------------------------------------
*/

export async function monthlyReport(
    employeeId,
    from,
    to
) {

    return attendanceRepository.findBetweenDates(
        employeeId,
        from,
        to
    );

}

/*
|--------------------------------------------------------------------------
| Daily Attendance Report
|--------------------------------------------------------------------------
*/

export async function dailyReport(date) {

    return attendanceRepository.findByDate(date);

}
