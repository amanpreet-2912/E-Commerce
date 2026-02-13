import mongoose from "mongoose";
import { User } from "../models/userSchema.js";

async function addAdmin() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");

    const admin = User.create({
      name: "Admin",
      email: "aman.preet09896@gmail.com",
      password: "123456",
      role: "admin",
      isVerified: true,
    });
    console.log("admin created successfully");
  } catch (err) {
    console.log(err);
  }
}
addAdmin();
