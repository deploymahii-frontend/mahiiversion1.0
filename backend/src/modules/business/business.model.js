import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    legalName: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    businessType: {
      type: String,
      required: true,
      enum: [
        "restaurant",
        "cafe",
        "hotel",
        "mess",
        "grocery",
        "medical",
        "clothing",
        "electronics",
        "salon",
        "barber",
        "gym",
        "bakery",
        "hostel",
        "pg",
        "laundry",
        "stationery",
        "other",
      ],
      index: true,
    },

    description: {
      type: String,
      maxlength: 2000,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    address: {
      line1: String,
      line2: String,
      area: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
      postalCode: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    logo: String,

    coverImage: String,

    gallery: {
      type: [String],
      default: [],
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "active", "inactive", "suspended"],
      default: "draft",
      index: true,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    settings: {
      acceptOrders: {
        type: Boolean,
        default: true,
      },
      acceptBookings: {
        type: Boolean,
        default: true,
      },
      deliveryAvailable: {
        type: Boolean,
        default: false,
      },
      pickupAvailable: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

businessSchema.index({ location: "2dsphere" });

const Business = mongoose.model("Business", businessSchema);

export default Business;
