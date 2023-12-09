import mongoose from "mongoose";
import validator from "validator";

const PasswordSchema = new mongoose.Schema(
	{
		friendlyName: {
			type: String,
			required: [true, "Please enter the website"],
		},
		username: {
			type: String,
			required: [true, "Please enter your username"],
		},
		password: {
			type: String,
			required: [true, "Please enter your password"],
		},
		userId: {
			type: String,
			required: [true, "Please enter your userId"],
		},
		credentialType:{
			type: String,
			enum:["Browser","Application","Payment","Other"],
			required: [true, "Please enter correct credentialType"],
		}
	},
	{ timestamps: true }
);

export default mongoose.model("Password", PasswordSchema);
