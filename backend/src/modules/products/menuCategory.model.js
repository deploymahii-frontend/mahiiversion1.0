import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema({

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: String,

    displayOrder: {
        type: Number,
        default: 0
    },

    active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "MenuCategory",
    menuCategorySchema
);
