import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    },
    vehicleNum: {
      type: String,
      required: function () {
        return this.role === "transporter";
      },
    },
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
