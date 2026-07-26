import mongoose from "mongoose";
import {
	CATALOG_ITEM_TYPES,
	CATALOG_STATUS,
	DEFAULT_CURRENCY,
} from "../../shared/constants/catalog.constants.js";

const catalogSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		itemType: {
			type: String,
			enum: Object.values(CATALOG_ITEM_TYPES),
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
			lowercase: true,
			trim: true,
			index: true,
		},

		description: {
			type: String,
			trim: true,
			maxlength: 3000,
		},

		shortDescription: {
			type: String,
			trim: true,
			maxlength: 300,
		},

		sku: {
			type: String,
			trim: true,
			index: true,
		},

		price: {
			type: Number,
			required: true,
			min: 0,
		},

		discount: {
			type: Number,
			default: 0,
			min: 0,
		},

		currency: {
			type: String,
			default: DEFAULT_CURRENCY,
		},

		thumbnail: {
			type: String,
			default: "",
		},

		images: {
			type: [String],
			default: [],
		},

		tags: {
			type: [String],
			default: [],
		},

		status: {
			type: String,
			enum: Object.values(CATALOG_STATUS),
			default: CATALOG_STATUS.DRAFT,
			index: true,
		},

		trackInventory: {
			type: Boolean,
			default: false,
		},

		stock: {
			type: Number,
			default: 0,
			min: 0,
		},

		extraData: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		isDeleted: {
			type: Boolean,
			default: false,
			index: true,
		},

		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

catalogSchema.index({
	business: 1,
	status: 1,
});

catalogSchema.index({
	business: 1,
	slug: 1,
}, {
	unique: true,
});

catalogSchema.index({
	name: "text",
	description: "text",
	tags: "text",
});

const Catalog = mongoose.model("Catalog", catalogSchema);

export default Catalog;

