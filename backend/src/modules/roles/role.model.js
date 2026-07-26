import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        description: String,

        permissions: [{
            type: String
        }]

    },
    {
        timestamps: true
    }
);

export default mongoose.model("Role", RoleSchema);
