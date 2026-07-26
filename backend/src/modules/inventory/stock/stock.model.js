import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
        index: true
    },

    availableQuantity: {
        type: Number,
        default: 0,
        min: 0
    },

    reservedQuantity: {
        type: Number,
        default: 0,
        min: 0
    },

    damagedQuantity: {
        type: Number,
        default: 0,
        min: 0
    },

    inTransitQuantity: {
        type: Number,
        default: 0,
        min: 0
    },

    reorderLevel: {
        type: Number,
        default: 0
    },

    maximumLevel: {
        type: Number,
        default: 0
    },

    lastPurchasePrice: {
        type: Number,
        default: 0
    },

    averageCost: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

StockSchema.index(
{
    product: 1,
    warehouse: 1
},
{
    unique: true
});

export default mongoose.model(
    "Stock",
    StockSchema
);
