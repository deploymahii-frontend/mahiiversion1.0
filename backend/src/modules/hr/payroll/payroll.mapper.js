export function toPayrollResponse(payroll) {
    if (!payroll) return null;

    return {
        id: payroll._id,

        month: payroll.month,

        year: payroll.year,

        totalWorkingDays: payroll.totalWorkingDays,

        presentDays: payroll.presentDays,

        paidLeaveDays: payroll.paidLeaveDays,

        lossOfPayDays: payroll.lossOfPayDays,

        overtimeHours: payroll.overtimeHours,

        bonus: payroll.bonus,

        incentive: payroll.incentive,

        loanDeduction: payroll.loanDeduction,

        grossSalary: payroll.grossSalary,

        totalDeduction: payroll.totalDeduction,

        netSalary: payroll.netSalary,

        paymentStatus: payroll.paymentStatus,

        paymentDate: payroll.paymentDate,

        remarks: payroll.remarks,

        employee: payroll.employee
            ? {
                id: payroll.employee._id,
                employeeCode: payroll.employee.employeeCode
            }
            : null,

        createdAt: payroll.createdAt,

        updatedAt: payroll.updatedAt
    };
}
