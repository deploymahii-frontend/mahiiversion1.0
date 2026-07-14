import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { ROLES } from "../../shared/constants/roles.js";
import { ACCOUNT_STATUS } from "../../shared/constants/account-status.js";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, "Invalid email address"],
		},

		mobile: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},

		password: {
			type: String,
			required: true,
			minlength: 8,
			select: false,
		},

		profileImage: {
			type: String,
			default: "",
		},

		role: {
			type: String,
			enum: Object.values(ROLES),
			default: ROLES.CUSTOMER,
			index: true,
		},

		accountStatus: {
			type: String,
			enum: Object.values(ACCOUNT_STATUS),
			default: ACCOUNT_STATUS.PENDING,
			index: true,
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
		},

		isMobileVerified: {
			type: Boolean,
			default: false,
		},

		loginAttempts: {
			type: Number,
			default: 0,
		},

		lastLogin: {
			type: Date,
		},

		passwordChangedAt: {
			type: Date,
		},

		refreshTokens: {
			type: [String],
			default: [],
		},

		address: {
			city: String,
			state: String,
			country: {
				type: String,
				default: "India",
			},
			pincode: String,
		},

		preferences: {
			language: {
				type: String,
				default: "en",
			},

			theme: {
				type: String,
				default: "light",
			},

			notifications: {
				email: {
					type: Boolean,
					default: true,
				},

				push: {
					type: Boolean,
					default: true,
				},

				sms: {
					type: Boolean,
					default: false,
				},
			},
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}

	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
	transform(doc, ret) {
		delete ret.password;
		delete ret.refreshTokens;
		delete ret.__v;
		return ret;
	},
});

const User = mongoose.model("User", userSchema);

export default User;

