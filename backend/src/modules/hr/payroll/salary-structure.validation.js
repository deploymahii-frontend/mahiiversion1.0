import Joi from "joi";

export const createSalaryStructureSchema = Joi.object({
    employee: Joi.string().required(),
    basicSalary: Joi.number().min(0).required(),
    hra: Joi.number().min(0).default(0),
    da: Joi.number().min(0).default(0),
    specialAllowance: Joi.number().min(0).default(0),
    medicalAllowance: Joi.number().min(0).default(0),
    travelAllowance: Joi.number().min(0).default(0),
    otherAllowance: Joi.number().min(0).default(0),
    pf: Joi.number().min(0).default(0),
    esi: Joi.number().min(0).default(0),
    professionalTax: Joi.number().min(0).default(0),
    incomeTax: Joi.number().min(0).default(0),
    otherDeduction: Joi.number().min(0).default(0),
    effectiveFrom: Joi.date().required()
});

export const updateSalaryStructureSchema = Joi.object({
    basicSalary: Joi.number().min(0),
    hra: Joi.number().min(0),
    da: Joi.number().min(0),
    specialAllowance: Joi.number().min(0),
    medicalAllowance: Joi.number().min(0),
    travelAllowance: Joi.number().min(0),
    otherAllowance: Joi.number().min(0),
    pf: Joi.number().min(0),
    esi: Joi.number().min(0),
    professionalTax: Joi.number().min(0),
    incomeTax: Joi.number().min(0),
    otherDeduction: Joi.number().min(0),
    effectiveFrom: Joi.date()
});
