import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
{
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        index: true
    },

    date: {
        type: Date,
        required: true,
        index: true
    },

    checkIn: Date,

    checkOut: Date,

    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift"
    },

    workingHours: {
        type: Number,
        default: 0
    },

    overtimeHours: {
        type: Number,
        default: 0
    },

    breakMinutes: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "PRESENT",
            "ABSENT",
            "HALF_DAY",
            "LATE",
            "HOLIDAY",
            "WEEK_OFF",
            "LEAVE"
        ],
        default: "PRESENT"
    },

    location: {
        latitude: Number,
        longitude: Number
    },

    remarks: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

AttendanceSchema.index(
{
    employee: 1,
    date: 1
},
{
    unique: true
});

export default mongoose.model(
    "Attendance",
    AttendanceSchema
);