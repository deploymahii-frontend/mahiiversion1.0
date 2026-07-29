import * as employeeService from "./employee.service.js";

/*
|--------------------------------------------------------------------------
| Create Employee
|--------------------------------------------------------------------------
*/

export async function createEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.createEmployee(req.body);

        return res.status(201).json({
            success: true,
            message: "Employee created successfully.",
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Update Employee
|--------------------------------------------------------------------------
*/

export async function updateEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.updateEmployee(
                req.params.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Get Employee
|--------------------------------------------------------------------------
*/

export async function getEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.getEmployee(req.params.id);

        return res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Employee List
|--------------------------------------------------------------------------
*/

export async function getEmployees(req, res, next) {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const employees =
            await employeeService.getEmployees(
                page,
                limit
            );

        return res.status(200).json({
            success: true,
            data: employees
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Search Employees
|--------------------------------------------------------------------------
*/

export async function searchEmployees(req, res, next) {
    try {

        const employees =
            await employeeService.searchEmployees(
                req.query.q || ""
            );

        return res.status(200).json({
            success: true,
            data: employees
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Activate Employee
|--------------------------------------------------------------------------
*/

export async function activateEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.activateEmployee(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            message: "Employee activated successfully.",
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Terminate Employee
|--------------------------------------------------------------------------
*/

export async function terminateEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.terminateEmployee(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            message: "Employee terminated successfully.",
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Resign Employee
|--------------------------------------------------------------------------
*/

export async function resignEmployee(req, res, next) {
    try {

        const employee =
            await employeeService.resignEmployee(
                req.params.id,
                req.body.relievingDate
            );

        return res.status(200).json({
            success: true,
            message: "Employee resigned successfully.",
            data: employee
        });

    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function statistics(req, res, next) {
    try {

        const data =
            await employeeService.getEmployeeStatistics();

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
}
