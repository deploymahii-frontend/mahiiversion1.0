import mongoose from "mongoose";

const GeneralLedgerSchema = new mongoose.Schema(
{
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChartOfAccount",
        required: true,
        index: true
    },

    journal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal",
        required: true,
        index: true
    },

    journalLine: {
        type: Number,
        required: true
    },

    transactionDate: {
        type: Date,
        required: true,
        default: Date.now
    },

    referenceType: {
        type: String,
        required: true
    },

    referenceId: {
        type: mongoose.Schema.Types.ObjectId
    },

    description: {
        type: String,
        default: ""
    },

    debit: {
        type: Number,
        default: 0
    },

    credit: {
        type: Number,
        default: 0
    },

    runningBalance: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

GeneralLedgerSchema.index({

    account: 1,

    transactionDate: 1

});

export default mongoose.model(
    "GeneralLedger",
    GeneralLedgerSchema
);
