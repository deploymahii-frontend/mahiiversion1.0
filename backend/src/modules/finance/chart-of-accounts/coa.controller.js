import * as coaService from "./coa.service.js";

/*
|--------------------------------------------------------------------------
| Create Account
|--------------------------------------------------------------------------
*/

export async function createAccount(req, res, next) {

    try {

        const account =
            await coaService.createAccount(
                req.body
            );

        return res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            data: account

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Update Account
|--------------------------------------------------------------------------
*/

export async function updateAccount(req, res, next) {

    try {

        const account =
            await coaService.updateAccount(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message:
                "Account updated successfully.",

            data: account

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Delete Account
|--------------------------------------------------------------------------
*/

export async function deleteAccount(req, res, next) {

    try {

        await coaService.deleteAccount(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message:
                "Account deleted successfully."

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Account Details
|--------------------------------------------------------------------------
*/

export async function getAccount(req, res, next) {

    try {

        const account =
            await coaService.getAccount(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: account

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Chart of Accounts
|--------------------------------------------------------------------------
*/

export async function getChart(req, res, next) {

    try {

        const chart =
            await coaService.getChart();

        return res.status(200).json({

            success: true,

            data: chart

        });

    } catch (error) {

        next(error);

    }

}
