import mongoose from "mongoose";

const DesignationSchema = new mongoose.Schema(
{
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
        index:true
    },

    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true,
        index:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    code:{
        type:String,
        required:true,
        trim:true
    },

    level:{
        type:Number,
        default:1
    },

    description:String,

    status:{
        type:String,
        enum:[
            "ACTIVE",
            "INACTIVE"
        ],
        default:"ACTIVE"
    }

},
{
    timestamps:true
});

DesignationSchema.index(
{
    company:1,
    department:1,
    code:1
},
{
    unique:true
});

export default mongoose.model(
    "Designation",
    DesignationSchema
);
