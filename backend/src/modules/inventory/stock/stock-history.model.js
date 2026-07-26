import mongoose from "mongoose";

const StockHistorySchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    transactionType: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    openingStock: {
        type: Number,
        required: true
    },

    closingStock: {
        type: Number,
        required: true
    },

    referenceNumber: {
        type: String,
        default: ""
    },

    remarks: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

StockHistorySchema.index({
    product: 1,
    warehouse: 1
});

StockHistorySchema.index({
    transactionType: 1
});

export default mongoose.model(
    "StockHistory",
    StockHistorySchema
);
