import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"

    },

    device:String,

    ip:String,

    refreshToken:String,

    expiresAt:Date,

    lastUsedAt:Date

});

export default mongoose.model(

    "Session",

    sessionSchema

);
