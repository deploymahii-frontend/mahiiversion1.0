import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
{
    employeeCode:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true,
        index:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
        index:true
    },

    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        required:true,
        index:true
    },

    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true,
        index:true
    },

    designation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Designation",
        required:true,
        index:true
    },

    reportingManager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        default:null
    },

    employmentType:{
        type:String,
        enum:[
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERN",
            "FREELANCER"
        ],
        default:"FULL_TIME"
    },

    joiningDate:{
        type:Date,
        required:true
    },

    confirmationDate:Date,

    probationEndDate:Date,

    resignationDate:Date,

    relievingDate:Date,

    status:{
        type:String,
        enum:[
            "ACTIVE",
            "PROBATION",
            "NOTICE_PERIOD",
            "RESIGNED",
            "TERMINATED",
            "INACTIVE"
        ],
        default:"PROBATION",
        index:true
    },

    workEmail:{
        type:String,
        lowercase:true,
        trim:true
    },

    workPhone:String,

    extension:String,

    shift:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shift"
    },

    weeklyOff:[String],

    attendanceEnabled:{
        type:Boolean,
        default:true
    },

    payrollEnabled:{
        type:Boolean,
        default:true
    },

    leaveEnabled:{
        type:Boolean,
        default:true
    },

    biometricId:String,

    faceRecognitionId:String,

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    deletedAt:Date

},
{
    timestamps:true
});

EmployeeSchema.virtual("fullName").get(function(){

    return `${this.user?.firstName || ""} ${this.user?.lastName || ""}`.trim();

});

EmployeeSchema.index({
    company:1,
    branch:1,
    department:1
});

EmployeeSchema.index({
    reportingManager:1
});

EmployeeSchema.index({
    joiningDate:1
});

EmployeeSchema.index({
    status:1
});

EmployeeSchema.set("toJSON",{virtuals:true});
EmployeeSchema.set("toObject",{virtuals:true});

export default mongoose.model(
    "Employee",
    EmployeeSchema
);
