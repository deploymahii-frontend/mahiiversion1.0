import * as leaveService from "./leave.service.js";

/*
|--------------------------------------------------------------------------
| Apply Leave
|--------------------------------------------------------------------------
*/

export async function applyLeave(req, res, next) {

    try {

        const leave =
            await leaveService.applyLeave({

                ...req.body,

                employee: req.user.employee

            });

        return res.status(201).json({

            success: true,

            message: "Leave applied successfully.",

            data: leave

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Approve Leave
|--------------------------------------------------------------------------
*/

export async function approveLeave(req, res, next) {

    try {

        const leave =
            await leaveService.approveLeave(

                req.params.id,

                req.user.employee

            );

        return res.status(200).json({

            success: true,

            message: "Leave approved successfully.",

            data: leave

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Reject Leave
|--------------------------------------------------------------------------
*/

export async function rejectLeave(req, res, next) {

    try {

        const leave =
            await leaveService.rejectLeave(

                req.params.id,

                req.user.employee,

                req.body.rejectionReason

            );

        return res.status(200).json({

            success: true,

            message: "Leave rejected successfully.",

            data: leave

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Cancel Leave
|--------------------------------------------------------------------------
*/

export async function cancelLeave(req, res, next) {

    try {

        const leave =
            await leaveService.cancelLeave(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message: "Leave cancelled successfully.",

            data: leave

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Employee Leave History
|--------------------------------------------------------------------------
*/

export async function getEmployeeLeaves(req, res, next) {

    try {

        const leaves =
            await leaveService.getEmployeeLeaves(

                req.params.employeeId

            );

        return res.status(200).json({

            success: true,

            data: leaves

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Pending Leave Requests
|--------------------------------------------------------------------------
*/

export async function getPendingLeaves(req, res, next) {

    try {

        const leaves =
            await leaveService.getPendingLeaves();

        return res.status(200).json({

            success: true,

            data: leaves

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Leave List
|--------------------------------------------------------------------------
*/

export async function getLeaveList(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const leaves =
            await leaveService.getLeaveList(
                page,
                limit
            );

        return res.status(200).json({

            success: true,

            data: leaves

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Leave Statistics
|--------------------------------------------------------------------------
*/

export async function statistics(req, res, next) {

    try {

        const statistics =
            await leaveService.getLeaveStatistics();

        return res.status(200).json({

            success: true,

            data: statistics

        });

    } catch (error) {

        next(error);

    }

}
