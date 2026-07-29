import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema(
{
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        index: true
    },

    salaryStructure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalaryStructure",
        required: true
    },

    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },

    year: {
        type: Number,
        required: true
    },

    totalWorkingDays: {
        type: Number,
        default: 0
    },

    presentDays: {
        type: Number,
        default: 0
    },

    paidLeaveDays: {
        type: Number,
        default: 0
    },

    lossOfPayDays: {
        type: Number,
        default: 0
    },

    overtimeHours: {
        type: Number,
        default: 0
    },

    bonus: {
        type: Number,
        default: 0
    },

    incentive: {
        type: Number,
        default: 0
    },

    loanDeduction: {
        type: Number,
        default: 0
    },

    grossSalary: {
        type: Number,
        required: true
    },

    totalDeduction: {
        type: Number,
        default: 0
    },

    netSalary: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: [
            "PENDING",
            "PROCESSING",
            "PAID"
        ],
        default: "PENDING"
    },

    paymentDate: Date,

    remarks: String

},
{
    timestamps: true
});

PayrollSchema.index({
    employee: 1,
    month: 1,
    year: 1
},
{
    unique: true
});

export default mongoose.model(
    "Payroll",
    PayrollSchema
);
