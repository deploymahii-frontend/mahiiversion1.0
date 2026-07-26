import Joi from "joi";

export const processPayrollSchema = Joi.object({
    employee: Joi.string().required(),

    month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(),

    year: Joi.number()
        .integer()
        .min(2000)
        .required(),

    bonus: Joi.number().min(0).default(0),

    incentive: Joi.number().min(0).default(0),

    loanDeduction: Joi.number().min(0).default(0)
});

export const payrollReportSchema = Joi.object({
    month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(),

    year: Joi.number()
        .integer()
        .min(2000)
        .required(),

    department: Joi.string(),

    branch: Joi.string(),

    employee: Joi.string()
});
