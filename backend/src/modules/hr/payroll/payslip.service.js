import payrollRepository from "./payroll.repository.js";

export async function generatePayslip(payrollId) {
    const payroll = await payrollRepository.findById(payrollId);

    if (!payroll) {
        throw new Error("Payroll not found.");
    }

    return {
        employee: payroll.employee,
        month: payroll.month,
        year: payroll.year,
        grossSalary: payroll.grossSalary,
        totalDeduction: payroll.totalDeduction,
        netSalary: payroll.netSalary,
        generatedAt: new Date()
    };
}
