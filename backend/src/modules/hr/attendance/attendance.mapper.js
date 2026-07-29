export function toAttendanceResponse(attendance) {

    if (!attendance) {

        return null;

    }

    return {

        id: attendance._id,

        employee: attendance.employee
            ? {
                id: attendance.employee._id,
                employeeCode: attendance.employee.employeeCode
            }
            : null,

        date: attendance.date,

        checkIn: attendance.checkIn,

        checkOut: attendance.checkOut,

        workingHours: attendance.workingHours,

        overtimeHours: attendance.overtimeHours,

        breakMinutes: attendance.breakMinutes,

        status: attendance.status,

        shift: attendance.shift
            ? {
                id: attendance.shift._id,
                name: attendance.shift.name
            }
            : null,

        location: attendance.location,

        remarks: attendance.remarks,

        createdAt: attendance.createdAt,

        updatedAt: attendance.updatedAt

    };

}
