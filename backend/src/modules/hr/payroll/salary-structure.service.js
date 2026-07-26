import salaryStructureRepository from "./salary-structure.repository.js";
import employeeRepository from "../employees/employee.repository.js";

/*
|--------------------------------------------------------------------------
| Calculate Gross Salary
|--------------------------------------------------------------------------
*/

function calculateGrossSalary(data) {

    return (

        Number(data.basicSalary || 0) +

        Number(data.hra || 0) +

        Number(data.da || 0) +

        Number(data.specialAllowance || 0) +

        Number(data.medicalAllowance || 0) +

        Number(data.travelAllowance || 0) +

        Number(data.otherAllowance || 0)

    );

}

/*
|--------------------------------------------------------------------------
| Calculate Net Salary
|--------------------------------------------------------------------------
*/

function calculateNetSalary(data, grossSalary) {

    const deductions =

        Number(data.pf || 0) +

        Number(data.esi || 0) +

        Number(data.professionalTax || 0) +

        Number(data.incomeTax || 0) +

        Number(data.otherDeduction || 0);

    return grossSalary - deductions;

}

/*
|--------------------------------------------------------------------------
| Create Salary Structure
|--------------------------------------------------------------------------
*/

export async function createSalaryStructure(data) {

    const employee =
        await employeeRepository.findById(data.employee);

    if (!employee) {

        throw new Error("Employee not found.");

    }

    const exists =
        await salaryStructureRepository.findByEmployee(
            data.employee
        );

    if (exists) {

        throw new Error("Salary structure already exists.");

    }

    const grossSalary =
        calculateGrossSalary(data);

    const netSalary =
        calculateNetSalary(data, grossSalary);

    return salaryStructureRepository.create({

        ...data,

        grossSalary,

        netSalary

    });

}

/*
|--------------------------------------------------------------------------
| Update Salary Structure
|--------------------------------------------------------------------------
*/

export async function updateSalaryStructure(id, data) {

    const grossSalary =
        calculateGrossSalary(data);

    const netSalary =
        calculateNetSalary(data, grossSalary);

    return salaryStructureRepository.update(

        id,

        {

            ...data,

            grossSalary,

            netSalary

        }

    );

}

/*
|--------------------------------------------------------------------------
| Get Salary Structure
|--------------------------------------------------------------------------
*/

export async function getSalaryStructure(employeeId) {

    return salaryStructureRepository.findByEmployee(
        employeeId
    );

}

/*
|--------------------------------------------------------------------------
| Salary List
|--------------------------------------------------------------------------
*/

export async function getSalaryStructures(page, limit) {

    return salaryStructureRepository.paginate(
        {},
        page,
        limit
    );

}

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function getSalaryStatistics() {

    return salaryStructureRepository.statistics();

}
