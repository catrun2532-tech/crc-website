import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/repair";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB error:", error);
  }
};