import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

    owner:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true,

        index:true

    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    slug:{
        type:String,
        unique:true,
        index:true
    },

    category:{
        type:String,
        required:true
    },

    description:String,

    phone:String,

    email:String,

    address:{

        line1:String,

        city:String,

        state:String,

        pincode:String,

        location:{

            type:{
                type:String,
                enum:["Point"],
                default:"Point"
            },

            coordinates:{
                type:[Number],
                default:[0,0]
            }

        }

    },

    logo:String,

    coverImage:String,

    website:String,

    tagline:String,

    socialLinks: {
      whatsapp: String,
      instagram: String,
    },

    relatedShops: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    }],

    isOpen: {
      type: Boolean,
      default: true,
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:[
            "PENDING",
            "APPROVED",
            "REJECTED",
            "SUSPENDED"
        ],
        default:"PENDING"
    },

    businessHours: {

        monday: {
            open: String,
            close: String,
            closed: {
                type: Boolean,
                default: false
            }
        },

        tuesday: {
            open: String,
            close: String,
            closed: Boolean
        },

        wednesday: {
            open: String,
            close: String,
            closed: Boolean
        },

        thursday: {
            open: String,
            close: String,
            closed: Boolean
        },

        friday: {
            open: String,
            close: String,
            closed: Boolean
        },

        saturday: {
            open: String,
            close: String,
            closed: Boolean
        },

        sunday: {
            open: String,
            close: String,
            closed: Boolean
        }

    },

    deliverySettings: {

        deliveryRadius: {
            type: Number,
            default: 5
        },

        minimumOrder: {
            type: Number,
            default: 0
        },

        deliveryFee: {
            type: Number,
            default: 0
        },

        averageDeliveryTime: {
            type: Number,
            default: 30
        }

    },

    verification: {

        panCard: String,

        gstNumber: String,

        fssaiLicense: String,

        aadhaar: String,

        cancelledCheque: String,

        verifiedAt: Date,

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },

    images: {

        logo: String,

        cover: String,

        gallery: [
            String
        ]

    }

}, {
    timestamps:true
});

shopSchema.index({
    "address.location":"2dsphere"
});

export default mongoose.model(
    "Shop",
    shopSchema
);
