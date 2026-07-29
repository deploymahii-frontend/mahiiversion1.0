import Joi from "joi";

export const createDepartmentSchema = Joi.object({
    company: Joi.string().required(),
    branch: Joi.string().required(),
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    manager: Joi.string().trim().optional().allow(""),
    description: Joi.string().trim().optional().allow(""),
    status: Joi.string().valid("ACTIVE", "INACTIVE").optional()
});

export const updateDepartmentSchema = createDepartmentSchema.fork([
    "company",
    "branch",
    "name",
    "code"
], (schema) => schema.optional());
