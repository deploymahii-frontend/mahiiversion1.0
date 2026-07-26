import Joi from "joi";

/*
|--------------------------------------------------------------------------
| Employee Check In
|--------------------------------------------------------------------------
*/

export const checkInSchema = Joi.object({

    date: Joi.date()
        .required(),

    latitude: Joi.number()
        .optional(),

    longitude: Joi.number()
        .optional(),

    remarks: Joi.string()
        .max(500)
        .allow("", null)

});

/*
|--------------------------------------------------------------------------
| Employee Check Out
|--------------------------------------------------------------------------
*/

export const checkOutSchema = Joi.object({

    remarks: Joi.string()
        .max(500)
        .allow("", null)

});

/*
|--------------------------------------------------------------------------
| Manual Attendance
|--------------------------------------------------------------------------
*/

export const createAttendanceSchema = Joi.object({

    employee: Joi.string()
        .required(),

    date: Joi.date()
        .required(),

    checkIn: Joi.date()
        .required(),

    checkOut: Joi.date()
        .required(),

    shift: Joi.string(),

    status: Joi.string().valid(

        "PRESENT",

        "ABSENT",

        "HALF_DAY",

        "LATE",

        "HOLIDAY",

        "WEEK_OFF",

        "LEAVE"

    )

});

/*
|--------------------------------------------------------------------------
| Update Attendance
|--------------------------------------------------------------------------
*/

export const updateAttendanceSchema = Joi.object({

    checkIn: Joi.date(),

    checkOut: Joi.date(),

    overtimeHours: Joi.number(),

    breakMinutes: Joi.number(),

    remarks: Joi.string()
        .max(500)

});

/*
|--------------------------------------------------------------------------
| Monthly Report
|--------------------------------------------------------------------------
*/

export const monthlyReportSchema = Joi.object({

    from: Joi.date()
        .required(),

    to: Joi.date()
        .required()

});

/*
|--------------------------------------------------------------------------
| Daily Report
|--------------------------------------------------------------------------
*/

export const dailyReportSchema = Joi.object({

    date: Joi.date()
        .required()

});
