import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
        index: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        unique: true,
        index: true
    },

    description: String,

    price: {
        type: Number,
        required: true
    },

    discountedPrice: Number,

    images: [String],

    available: {
        type: Boolean,
        default: true
    },

    variants: [
        {
            name: String,
            price: Number,
            available: {
                type: Boolean,
                default: true
            }
        }
    ],

    addons: [
        {
            name: String,
            price: Number
        }
    ],

    availability: {
        breakfast: {
            enabled: Boolean,
            start: String,
            end: String
        },
        lunch: {
            enabled: Boolean,
            start: String,
            end: String
        },
        dinner: {
            enabled: Boolean,
            start: String,
            end: String
        }
    },

    rating: {
        average: {
            type: Number,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    },

    favorites: {
        type: Number,
        default: 0
    },

    inventory: {
        quantity: {
            type: Number,
            default: 0
        },
        trackInventory: {
            type: Boolean,
            default: true
        }
    }

}, {
    timestamps:true
});

productSchema.index({
    name: "text",
    description: "text"
});

export default mongoose.models.Product || mongoose.model(
    "Product",
    productSchema
);
