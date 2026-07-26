import Joi from "joi";

export const createDesignationSchema = Joi.object({
    company: Joi.string().required(),
    department: Joi.string().required(),
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    level: Joi.number().integer().min(1).optional(),
    description: Joi.string().trim().optional().allow(""),
    status: Joi.string().valid("ACTIVE", "INACTIVE").optional()
});

export const updateDesignationSchema = createDesignationSchema.fork([
    "company",
    "department",
    "name",
    "code"
], (schema) => schema.optional());
