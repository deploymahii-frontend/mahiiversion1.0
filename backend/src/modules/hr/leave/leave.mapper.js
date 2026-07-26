export function toLeaveResponse(leave) {

    if (!leave) {

        return null;

    }

    return {

        id: leave._id,

        leaveType: leave.leaveType,

        fromDate: leave.fromDate,

        toDate: leave.toDate,

        totalDays: leave.totalDays,

        status: leave.status,

        reason: leave.reason,

        remarks: leave.remarks,

        rejectionReason: leave.rejectionReason,

        approvedAt: leave.approvedAt,

        employee: leave.employee
            ? {
                id: leave.employee._id,
                employeeCode: leave.employee.employeeCode
            }
            : null,

        approvedBy: leave.approvedBy
            ? {
                id: leave.approvedBy._id,
                employeeCode: leave.approvedBy.employeeCode
            }
            : null,

        createdAt: leave.createdAt,

        updatedAt: leave.updatedAt

    };

}
