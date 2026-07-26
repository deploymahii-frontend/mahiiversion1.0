import mongoose from "mongoose";

const JournalLineSchema = new mongoose.Schema(
{
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChartOfAccount",
        required: true
    },

    debit: {
        type: Number,
        default: 0
    },

    credit: {
        type: Number,
        default: 0
    },

    narration: {
        type: String,
        default: ""
    }

},
{
    _id: false
});

const JournalSchema = new mongoose.Schema(
{
    journalNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    journalDate: {
        type: Date,
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

    lines: {
        type: [JournalLineSchema],
        validate: {
            validator: function (lines) {
                return Array.isArray(lines) && lines.length >= 2;
            },
            message: "Journal must contain at least two lines."
        }
    },

    totalDebit: {
        type: Number,
        default: 0
    },

    totalCredit: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "DRAFT"
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

export default mongoose.model(
    "Journal",
    JournalSchema
);
