import Joi from 'joi';

export const createUserSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().trim().required().messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().trim().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    mobile: Joi.string().trim().optional().allow(''),
    role: Joi.string().trim().optional().allow(''),
    company: Joi.string().trim().optional().allow(''),
    branch: Joi.string().trim().optional().allow(''),
    department: Joi.string().trim().optional().allow(''),
    designation: Joi.string().trim().optional().allow(''),
    avatar: Joi.string().trim().optional().allow(''),
    status: Joi.string().trim().optional().allow(''),
    joiningDate: Joi.date().optional()
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().optional(),
    email: Joi.string().email().trim().optional(),
    mobile: Joi.string().trim().optional().allow(''),
    role: Joi.string().trim().optional().allow(''),
    company: Joi.string().trim().optional().allow(''),
    branch: Joi.string().trim().optional().allow(''),
    department: Joi.string().trim().optional().allow(''),
    designation: Joi.string().trim().optional().allow(''),
    avatar: Joi.string().trim().optional().allow(''),
    status: Joi.string().trim().optional().allow(''),
    joiningDate: Joi.date().optional()
});

export const updateProfileSchema = Joi.object({
    firstName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().optional(),
    email: Joi.string().email().trim().optional(),
    mobile: Joi.string().trim().optional().allow(''),
    company: Joi.string().trim().optional().allow(''),
    branch: Joi.string().trim().optional().allow(''),
    department: Joi.string().trim().optional().allow(''),
    designation: Joi.string().trim().optional().allow(''),
    avatar: Joi.string().trim().optional().allow(''),
    joiningDate: Joi.date().optional()
});
