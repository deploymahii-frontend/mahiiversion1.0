import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },

    level: {
        type: Number,
        default: 1
    },

    sortOrder: {
        type: Number,
        default: 0
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

CategorySchema.index({
    parent: 1
});

export default mongoose.model(
    "Category",
    CategorySchema
);
