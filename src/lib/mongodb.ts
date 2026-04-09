import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// ใช้ global กัน connect ซ้ำ (สำคัญมากใน Next.js)
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.log("❌ MongoDB error:", err);
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};

// เก็บ cache ไว้ global
(global as any).mongoose = cached;