import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validator: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Your password must be longer than 8 characters"],
      select: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
