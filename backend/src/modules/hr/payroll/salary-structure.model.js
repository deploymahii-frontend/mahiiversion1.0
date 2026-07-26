import mongoose from "mongoose";

const SalaryStructureSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            unique: true,
            index: true
        },

        basicSalary: {
            type: Number,
            required: true,
            min: 0
        },

        hra: {
            type: Number,
            default: 0
        },

        da: {
            type: Number,
            default: 0
        },

        specialAllowance: {
            type: Number,
            default: 0
        },

        medicalAllowance: {
            type: Number,
            default: 0
        },

        travelAllowance: {
            type: Number,
            default: 0
        },

        otherAllowance: {
            type: Number,
            default: 0
        },

        pf: {
            type: Number,
            default: 0
        },

        esi: {
            type: Number,
            default: 0
        },

        professionalTax: {
            type: Number,
            default: 0
        },

        incomeTax: {
            type: Number,
            default: 0
        },

        otherDeduction: {
            type: Number,
            default: 0
        },

        grossSalary: {
            type: Number,
            default: 0
        },

        netSalary: {
            type: Number,
            default: 0
        },

        effectiveFrom: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("SalaryStructure", SalaryStructureSchema);
