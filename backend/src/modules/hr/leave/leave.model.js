import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true
        },

        leaveType: {
            type: String,
            enum: [
                "CASUAL",
                "SICK",
                "EARNED",
                "MATERNITY",
                "PATERNITY",
                "LOSS_OF_PAY"
            ],
            required: true
        },

        fromDate: {
            type: Date,
            required: true
        },

        toDate: {
            type: Date,
            required: true
        },

        totalDays: {
            type: Number,
            required: true
        },

        reason: {
            type: String,
            maxlength: 1000
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "APPROVED",
                "REJECTED",
                "CANCELLED"
            ],
            default: "PENDING",
            index: true
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        approvedAt: Date,

        rejectionReason: String,

        remarks: String
    },
    {
        timestamps: true
    }
);

LeaveSchema.index({
    employee: 1,
    fromDate: 1,
    toDate: 1
});

export default mongoose.model("Leave", LeaveSchema);
