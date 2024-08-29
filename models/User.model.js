import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is not Submitted"],
    },
    number: {
      type: String,
      required: [true, "Number is not provided"],
      validate: {
        validator: (v) => v.length === 10,
        message: "Number must be 10 digits",
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "{VALUE} is not a valid email!",
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", UserSchema);
