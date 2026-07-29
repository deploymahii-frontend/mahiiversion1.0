import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
{
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        index: true
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    code: {
        type: String,
        required: true,
        trim: true
    },

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    description: String,

    status: {
        type: String,
        enum: [
            "ACTIVE",
            "INACTIVE"
        ],
        default: "ACTIVE"
    }

},
{
    timestamps: true
});

DepartmentSchema.index({
    company: 1,
    branch: 1,
    code: 1
},{
    unique: true
});

export default mongoose.model(
    "Department",
    DepartmentSchema
);
