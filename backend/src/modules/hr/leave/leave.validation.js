import Joi from "joi";

/*
|--------------------------------------------------------------------------
| Apply Leave
|--------------------------------------------------------------------------
*/

export const applyLeaveSchema = Joi.object({

    leaveType: Joi.string()
        .valid(
            "CASUAL",
            "SICK",
            "EARNED",
            "MATERNITY",
            "PATERNITY",
            "LOSS_OF_PAY"
        )
        .required(),

    fromDate: Joi.date()
        .required(),

    toDate: Joi.date()
        .required(),

    reason: Joi.string()
        .max(1000)
        .required(),

    remarks: Joi.string()
        .max(500)
        .allow("", null)

});

/*
|--------------------------------------------------------------------------
| Reject Leave
|--------------------------------------------------------------------------
*/

export const rejectLeaveSchema = Joi.object({

    rejectionReason: Joi.string()
        .max(1000)
        .required()

});

/*
|--------------------------------------------------------------------------
| Approve Leave
|--------------------------------------------------------------------------
*/

export const approveLeaveSchema = Joi.object({

    remarks: Joi.string()
        .max(500)
        .allow("", null)

});

/*
|--------------------------------------------------------------------------
| Cancel Leave
|--------------------------------------------------------------------------
*/

export const cancelLeaveSchema = Joi.object({

    remarks: Joi.string()
        .max(500)
        .allow("", null)

});

/*
|--------------------------------------------------------------------------
| Leave Report
|--------------------------------------------------------------------------
*/

export const leaveReportSchema = Joi.object({

    from: Joi.date()
        .required(),

    to: Joi.date()
        .required(),

    employee: Joi.string(),

    department: Joi.string(),

    status: Joi.string()
        .valid(
            "PENDING",
            "APPROVED",
            "REJECTED",
            "CANCELLED"
        )

});
