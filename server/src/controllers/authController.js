import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/sendEmail.js";
function generateOtp() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}
export async function registerUser(req, res) {
  try {
    const { name, email, password, role, gstin, vehicleNum } = req.body;

    const exists = await User.findOne({ email });
    if (exists && exists.isVerified) {
      return res
        .status(409)
        .json({ message: "Email already registered. Please Login" });
    }
    if (exists && !exists.isVerified) {
      const otp = generateOtp();
      exists.otp = otp;
      exists.otpExpires = Date.now() + 10 * 60 * 1000;
      await exists.save();
      await sendOtpEmail(email, otp);
      return res.status(200).json({
        message: "Email not Verified, Otp resent",
        resumeVerification: true,
      });
    }
    if (role === "seller" && !gstin) {
      return res.status(400).json({ message: "GSTIN is required for sellers" });
    }
    if ((role === "transporter") & !vehicleNum) {
      return res
        .status(400)
        .json({ message: "Vehicle Number is required for Transporters" });
    }
    const otp = generateOtp();
    let approved = "approved";

    if (role === "seller" || role === "transporter") {
      approved = "pending";
    }

    const user = await User.create({
      name,
      email,
      password,
      gstin: role === "seller" ? gstin : undefined,
      vehicleNum: role === "transporter" ? vehicleNum : undefined,
      otp: otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
      role: role,
      approvalStatus: approved,
    });
    await sendOtpEmail(user.email, otp);
    res.status(201).json({ message: "Registered" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error signing up user" });
  }
}
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not foud" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(403).json({ message: "OTP expired" });
    }
    const match = user.otp === otp;
    if (!match) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error in verifying OTP!" });
  }
}
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000;
      await user.save();
      await sendOtpEmail(email, otp);
      return res.status(200).json({
        resumeVerification: true,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        approvalStatus: user.approvalStatus,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      approvalStatus: user.approvalStatus,
      createdAt: user.createdAt,
    };
    if (user.role === "seller") {
      data.gstin = user.gstin;
    }
    if (user.role === "transporter") {
      data.vehicleNum = user.vehicleNum;
    }
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error logging in" });
  }
}
export async function getUser(req, res) {
  try {
    const { id } = req.body;
    const user = User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error getting user" });
  }
}
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(404).json({ message: "Verify your email first" });
    }
    const otp = generateOtp();
    user.resetPassword = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "OTP sent for password reset" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "error sending otp for resetting password" });
  }
}
export async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetPassword !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
    user.password = newPassword;
    user.resetPassword = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfull" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error resetting password" });
  }
}
