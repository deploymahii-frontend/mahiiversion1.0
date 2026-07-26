import * as attendanceService from "./attendance.service.js";

/*
|--------------------------------------------------------------------------
| Employee Check In
|--------------------------------------------------------------------------
*/

export async function checkIn(req, res, next) {

    try {

        const attendance =
            await attendanceService.checkIn(
                req.user.employee,
                req.body
            );

        return res.status(200).json({

            success: true,

            message: "Check In Successful.",

            data: attendance

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Employee Check Out
|--------------------------------------------------------------------------
*/

export async function checkOut(req, res, next) {

    try {

        const attendance =
            await attendanceService.checkOut(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message: "Check Out Successful.",

            data: attendance

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Attendance Details
|--------------------------------------------------------------------------
*/

export async function getAttendance(req, res, next) {

    try {

        const attendance =
            await attendanceService.getAttendance(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: attendance

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Attendance List
|--------------------------------------------------------------------------
*/

export async function getAttendanceList(req, res, next) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const attendance =
            await attendanceService.getAttendanceList(
                page,
                limit
            );

        return res.status(200).json({

            success: true,

            data: attendance

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Employee Attendance
|--------------------------------------------------------------------------
*/

export async function getEmployeeAttendance(req, res, next) {

    try {

        const attendance =
            await attendanceService.getEmployeeAttendance(
                req.params.employeeId
            );

        return res.status(200).json({

            success: true,

            data: attendance

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Daily Report
|--------------------------------------------------------------------------
*/

export async function dailyReport(req, res, next) {

    try {

        const report =
            await attendanceService.dailyReport(
                req.query.date
            );

        return res.status(200).json({

            success: true,

            data: report

        });

    } catch (error) {

        next(error);

    }

}

/*
|--------------------------------------------------------------------------
| Monthly Report
|--------------------------------------------------------------------------
*/

export async function monthlyReport(req, res, next) {

    try {

        const report =
            await attendanceService.monthlyReport(

                req.params.employeeId,

                req.query.from,

                req.query.to

            );

        return res.status(200).json({

            success: true,

            data: report

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

        const statistics =
            await attendanceService.getAttendanceStatistics();

        return res.status(200).json({

            success: true,

            data: statistics

        });

    } catch (error) {

        next(error);

    }

}
