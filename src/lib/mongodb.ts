import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// 👇 type สำหรับ cache (กัน TS error)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 👇 ใช้ globalThis แบบปลอดภัย
let cached = (globalThis as any)._mongoose as MongooseCache;

if (!cached) {
  cached = (globalThis as any)._mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // ถ้ามี connection แล้ว → ใช้เลย
  if (cached.conn) {
    return cached.conn;
  }

  // ถ้ายังไม่มี → สร้าง promise ใหม่
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;