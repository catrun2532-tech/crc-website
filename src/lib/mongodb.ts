import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// 👇 type ให้ชัด (กัน TS งอแง)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 👇 ใช้ globalThis (ถูกต้องกว่า global)
let cached = (globalThis as any).mongoose as MongooseCache;

if (!cached) {
  cached = (globalThis as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // ✅ ถ้าเคย connect แล้ว ใช้ของเดิม
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ ถ้ายังไม่เคย connect → สร้าง promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    cached.promise = null; // 🔥 กันค้าง
    throw error;
  }

  return cached.conn;
}

// ✅ สำคัญ: export default (ให้ตรงกับ route)
export default connectDB;