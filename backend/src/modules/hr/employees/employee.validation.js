import Joi from "joi";

export const createEmployeeSchema = Joi.object({

    employeeCode: Joi.string()
        .trim()
        .uppercase()
        .required(),

    user: Joi.string()
        .required(),

    company: Joi.string()
        .required(),

    branch: Joi.string()
        .required(),

    department: Joi.string()
        .required(),

    designation: Joi.string()
        .required(),

    reportingManager: Joi.string()
        .allow(null, ""),

    employmentType: Joi.string()
        .valid(
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERN",
            "FREELANCER"
        )
        .required(),

    joiningDate: Joi.date()
        .required(),

    confirmationDate: Joi.date(),

    probationEndDate: Joi.date(),

    workEmail: Joi.string()
        .email(),

    workPhone: Joi.string(),

    extension: Joi.string(),

    attendanceEnabled: Joi.boolean(),

    payrollEnabled: Joi.boolean(),

    leaveEnabled: Joi.boolean(),

    biometricId: Joi.string(),

    faceRecognitionId: Joi.string()

});

export const updateEmployeeSchema = Joi.object({

    company: Joi.string(),

    branch: Joi.string(),

    department: Joi.string(),

    designation: Joi.string(),

    reportingManager: Joi.string()
        .allow(null, ""),

    employmentType: Joi.string()
        .valid(
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERN",
            "FREELANCER"
        ),

    confirmationDate: Joi.date(),

    probationEndDate: Joi.date(),

    workEmail: Joi.string()
        .email(),

    workPhone: Joi.string(),

    extension: Joi.string(),

    attendanceEnabled: Joi.boolean(),

    payrollEnabled: Joi.boolean(),

    leaveEnabled: Joi.boolean(),

    biometricId: Joi.string(),

    faceRecognitionId: Joi.string()

});

export const resignEmployeeSchema = Joi.object({

    relievingDate: Joi.date()
        .required(),

    reason: Joi.string()
        .max(500)
        .required()

});

export const transferEmployeeSchema = Joi.object({

    branch: Joi.string()
        .required(),

    department: Joi.string()
        .required(),

    designation: Joi.string()
        .required(),

    reportingManager: Joi.string()
        .allow(null, ""),

    effectiveDate: Joi.date()
        .required()

});

export const promoteEmployeeSchema = Joi.object({

    designation: Joi.string()
        .required(),

    salary: Joi.number()
        .positive(),

    effectiveDate: Joi.date()
        .required(),

    remarks: Joi.string()
        .max(500)

});
