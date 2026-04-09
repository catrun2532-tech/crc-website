import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// ใช้ global กัน connect ซ้ำ (สำคัญใน Next.js)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ MongoDB error:", err);
    cached.promise = null; // 🔥 สำคัญมาก
    throw err;
  }

  return cached.conn;
};