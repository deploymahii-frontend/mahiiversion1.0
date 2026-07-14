import mongoose from "mongoose";
import {
  SHOP_STATUS,
  VERIFICATION_STATUS,
  SHOP_CATEGORIES,
  SHOP_DEFAULTS,
  DAYS_OF_WEEK,
} from "./shop.constants.js";

const businessHourSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: DAYS_OF_WEEK,
      required: true,
    },
    open: {
      type: String,
      default: "",
    },
    close: {
      type: String,
      default: "",
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    addressLine: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      default: "India",
    },
    pincode: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // [longitude, latitude]
    },
  },
  { _id: false }
);

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shopCode: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: SHOP_DEFAULTS.MAX_DESCRIPTION_LENGTH,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: SHOP_CATEGORIES,
    },

    tags: {
      type: [String],
      default: [],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    cover: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },

    address: {
      type: addressSchema,
      default: () => ({}),
    },

    location: {
      type: locationSchema,
      default: () => ({
        type: "Point",
        coordinates: [0, 0],
      }),
    },

    businessHours: {
      type: [businessHourSchema],
      default: [],
    },

    paymentSettings: {
      acceptsCash: {
        type: Boolean,
        default: true,
      },

      acceptsUPI: {
        type: Boolean,
        default: true,
      },

      acceptsOnline: {
        type: Boolean,
        default: false,
      },

      upiId: {
        type: String,
        default: "",
        trim: true,
      },

      upiName: {
        type: String,
        default: "",
        trim: true,
      },

      qrCode: {
        type: String,
        default: "",
      },
    },

    fulfillment: {
      pickup: {
        type: Boolean,
        default: true,
      },

      delivery: {
        type: Boolean,
        default: false,
      },

      dineIn: {
        type: Boolean,
        default: true,
      },

      preparationTime: {
        type: Number,
        default: 20,
      },

      deliveryRadius: {
        type: Number,
        default: 0,
      },

      minimumOrder: {
        type: Number,
        default: 0,
      },
    },

    facilities: {
      parking: {
        type: Boolean,
        default: false,
      },

      wifi: {
        type: Boolean,
        default: false,
      },

      ac: {
        type: Boolean,
        default: false,
      },

      familyFriendly: {
        type: Boolean,
        default: false,
      },

      pureVeg: {
        type: Boolean,
        default: false,
      },

      wheelchairAccessible: {
        type: Boolean,
        default: false,
      },
    },

    socialLinks: {
      instagram: {
        type: String,
        default: "",
      },

      facebook: {
        type: String,
        default: "",
      },

      whatsapp: {
        type: String,
        default: "",
      },
    },

    searchKeywords: {
      type: [String],
      default: [],
    },

    targetCustomers: {
      type: [String],
      enum: [
        "students",
        "families",
        "office",
        "travellers",
        "tourists",
        "couples",
      ],
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(SHOP_STATUS),
      default: SHOP_STATUS.DRAFT,
    },

    verificationStatus: {
      type: String,
      enum: Object.values(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.NOT_SUBMITTED,
      index: true,
    },

    rating: {
      type: Number,
      default: SHOP_DEFAULTS.RATING,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: SHOP_DEFAULTS.TOTAL_REVIEWS,
      min: 0,
    },

    totalOrders: {
      type: Number,
      default: SHOP_DEFAULTS.TOTAL_ORDERS,
      min: 0,
    },

    totalViews: {
      type: Number,
      default: SHOP_DEFAULTS.TOTAL_VIEWS,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

shopSchema.index({ owner: 1 });
shopSchema.index({ category: 1 });
shopSchema.index({ status: 1 });
shopSchema.index({ "address.city": 1 });
shopSchema.index({ location: "2dsphere" });

shopSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
