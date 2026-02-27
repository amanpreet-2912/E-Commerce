import mongoose from "mongoose";
import bcrypt from "bcrypt";
const addressSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: Number, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  default: { type: Boolean, default: false },
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "transporter", "seller"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
    gstin: {
      type: String,
      required: function () {
        return this.role === "seller";
      },
      unique: true,
    },
    vehicleNum: {
      type: String,
      required: function () {
        return this.role === "transporter";
      },
      unique: true,
    },
    addresses: [addressSchema],

    otp: String,
    otpExpires: Date,
    resetPassword: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const modify = this.isModified("password");
  if (!modify) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("user", userSchema);
export { User };
