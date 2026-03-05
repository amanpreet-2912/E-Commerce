import mongoose from "mongoose";
const url = process.env.MONGO_URL;
export async function connectDB() {
  try {
    await mongoose.connect(url);

    console.log("MongoDB COnnected");
  } catch (err) {
    console.log("Error COnnecting DB", err);
  }
}
  