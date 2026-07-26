import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
{
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true
    },

    barcode: {
        type: String,
        default: ""
    },

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

    description: {
        type: String,
        default: ""
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },

    brand: {
        type: String,
        default: ""
    },

    unit: {
        type: String,
        default: "PCS"
    },

    purchasePrice: {
        type: Number,
        default: 0
    },

    sellingPrice: {
        type: Number,
        required: true
    },

    gst: {
        type: Number,
        default: 0
    },

    currentStock: {
        type: Number,
        default: 0
    },

    minimumStock: {
        type: Number,
        default: 0
    },

    maximumStock: {
        type: Number,
        default: 0
    },

    images: [{
        type: String
    }],

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

ProductSchema.index({
    category: 1
});

ProductSchema.index({
    warehouse: 1
});

ProductSchema.index({
    supplier: 1
});

export default mongoose.model(
    "Product",
    ProductSchema
);
