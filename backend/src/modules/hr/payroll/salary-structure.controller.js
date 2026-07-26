import * as salaryStructureService from "./salary-structure.service.js";

/*
|--------------------------------------------------------------------------
| Create Salary Structure
|--------------------------------------------------------------------------
*/

export async function createSalaryStructure(req, res, next) {

    try {

        const salary =
            await salaryStructureService.createSalaryStructure(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Salary structure created successfully.",

            data: salary

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Salary Structure
|--------------------------------------------------------------------------
*/

export async function updateSalaryStructure(req, res, next) {

    try {

        const salary =
            await salaryStructureService.updateSalaryStructure(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Salary structure updated successfully.",

            data: salary

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Employee Salary Structure
|--------------------------------------------------------------------------
*/

export async function getSalaryStructure(req, res, next) {

    try {

        const salary =
            await salaryStructureService.getSalaryStructure(

                req.params.employeeId

            );

        return res.status(200).json({

            success: true,

            data: salary

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Salary Structure List
|--------------------------------------------------------------------------
*/

export async function getSalaryStructures(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const salaries =
            await salaryStructureService.getSalaryStructures(

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data: salaries

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Payroll Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function statistics(req, res, next) {

    try {

        const statistics =
            await salaryStructureService.getSalaryStatistics();

        return res.status(200).json({

            success: true,

            data: statistics

        });

    } catch (error) {

        next(error);

    }

}
