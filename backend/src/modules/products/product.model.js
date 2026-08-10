import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.Mixed,
      default: "General",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      sparse: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    sku: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      default: null,
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "ARCHIVED"],
      default: "ACTIVE",
      index: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    isVeg: {
      type: Boolean,
      default: true,
    },

    stock: {
      type: Number,
      default: 100,
    },

    variants: [
      {
        name: String,
        price: Number,
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],

    addons: [
      {
        name: String,
        price: Number,
      },
    ],

    availability: {
      breakfast: { enabled: Boolean, start: String, end: String },
      lunch: { enabled: Boolean, start: String, end: String },
      dinner: { enabled: Boolean, start: String, end: String },
    },

    rating: {
      average: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    favorites: {
      type: Number,
      default: 0,
    },

    inventory: {
      quantity: {
        type: Number,
        default: 100,
      },
      trackInventory: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  name: "text",
  description: "text",
});

// Auto generate unique slug if not present
productSchema.pre("save", async function () {
  if (!this.slug && this.name) {
    const cleanName = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.slug = `${cleanName}-${randomSuffix}`;
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
