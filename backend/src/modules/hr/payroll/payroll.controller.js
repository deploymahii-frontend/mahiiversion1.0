import * as payrollService from "./payroll.service.js";

/*
|--------------------------------------------------------------------------
| Process Payroll
|--------------------------------------------------------------------------
*/

export async function processPayroll(req, res, next) {
    try {
        const payroll = await payrollService.processPayroll(req.body);

        return res.status(201).json({
            success: true,
            message: "Payroll processed successfully.",
            data: payroll
        });
    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Payroll List
|--------------------------------------------------------------------------
*/

export async function getPayrolls(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const payrolls = await payrollService.getPayrolls(page, limit);

        return res.status(200).json({
            success: true,
            data: payrolls
        });
    } catch (error) {
        next(error);
    }
}

/*
|--------------------------------------------------------------------------
| Payroll Details
|--------------------------------------------------------------------------
*/

export async function getPayroll(req, res, next) {
    try {
        const payroll = await payrollService.getPayroll(req.params.id);

        return res.status(200).json({
            success: true,
            data: payroll
        });
    } catch (error) {
        next(error);
    }
}
