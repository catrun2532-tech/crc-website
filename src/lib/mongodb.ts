import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// ✅ เพิ่ม global type (กัน TS error)
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// ✅ ใช้ cache จาก globalThis
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // ✅ ถ้ามี connection แล้ว
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ ถ้ายังไม่มี promise → สร้างใหม่
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