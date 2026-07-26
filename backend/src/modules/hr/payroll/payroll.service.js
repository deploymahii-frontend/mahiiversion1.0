import payrollRepository from "./payroll.repository.js";
import salaryStructureRepository from "./salary-structure.repository.js";

import attendanceRepository from "../attendance/attendance.repository.js";
import leaveRepository from "../leave/leave.repository.js";

/*
|--------------------------------------------------------------------------
| Process Monthly Payroll
|--------------------------------------------------------------------------
*/

export async function processPayroll({

    employee,

    month,

    year,

    bonus = 0,

    incentive = 0,

    loanDeduction = 0

}) {

    /*
    |--------------------------------------------------------------------------
    | Existing Payroll Check
    |--------------------------------------------------------------------------
    */

    const exists =
        await payrollRepository.findEmployeePayroll(
            employee,
            month,
            year
        );

    if (exists) {

        throw new Error(
            "Payroll already processed."
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Salary Structure
    |--------------------------------------------------------------------------
    */

    const salary =
        await salaryStructureRepository.findByEmployee(
            employee
        );

    if (!salary) {

        throw new Error(
            "Salary Structure not found."
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Attendance
    |--------------------------------------------------------------------------
    */

    const firstDay =
        new Date(year, month - 1, 1);

    const lastDay =
        new Date(year, month, 0);

    const attendance =
        await attendanceRepository.findBetweenDates(

            employee,

            firstDay,

            lastDay

        );

    const totalWorkingDays =
        lastDay.getDate();

    const presentDays =
        attendance.filter(a =>
            a.status === "PRESENT"
        ).length;

    const overtimeHours =
        attendance.reduce(

            (sum, item) =>
                sum + item.overtimeHours,

            0

        );

    /*
    |--------------------------------------------------------------------------
    | Approved Leave
    |--------------------------------------------------------------------------
    */

    const approvedLeaves =
        await leaveRepository.findApproved(
            employee
        );

    const paidLeaveDays =
        approvedLeaves.reduce(

            (sum, leave) =>
                sum + leave.totalDays,

            0

        );

    /*
    |--------------------------------------------------------------------------
    | LOP
    |--------------------------------------------------------------------------
    */

    const lossOfPayDays =

        Math.max(

            totalWorkingDays -

            presentDays -

            paidLeaveDays,

            0

        );

    /*
    |--------------------------------------------------------------------------
    | Salary
    |--------------------------------------------------------------------------
    */

    const perDaySalary =
        salary.grossSalary /
        totalWorkingDays;

    const lopAmount =
        perDaySalary *
        lossOfPayDays;

    const overtimeAmount =
        overtimeHours * 200;

    const grossSalary =

        salary.grossSalary +

        bonus +

        incentive +

        overtimeAmount;

    const totalDeduction =

        salary.pf +

        salary.esi +

        salary.professionalTax +

        salary.incomeTax +

        salary.otherDeduction +

        loanDeduction +

        lopAmount;

    const netSalary =
        grossSalary -
        totalDeduction;

    /*
    |--------------------------------------------------------------------------
    | Save Payroll
    |--------------------------------------------------------------------------
    */

    return payrollRepository.create({

        employee,

        salaryStructure:
            salary._id,

        month,

        year,

        totalWorkingDays,

        presentDays,

        paidLeaveDays,

        lossOfPayDays,

        overtimeHours,

        bonus,

        incentive,

        loanDeduction,

        grossSalary,

        totalDeduction,

        netSalary

    });

}

/*
|--------------------------------------------------------------------------
| Payroll List
|--------------------------------------------------------------------------
*/

export async function getPayrolls(
    page,
    limit
) {

    return payrollRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Payroll Details
|--------------------------------------------------------------------------
*/

export async function getPayroll(id) {

    return payrollRepository.findById(id);

}
