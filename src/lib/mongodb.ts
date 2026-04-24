import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// type สำหรับ cache
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// ใช้ global cache (กัน reconnect ซ้ำ)
const globalWithMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalWithMongoose._mongoose || {
    conn: null,
    promise: null,
  };

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = cached;
}

async function connectDB() {
  // ถ้า connect แล้ว → ใช้เลย
  if (cached.conn) return cached.conn;

  // ถ้ายังไม่เคย connect → สร้าง promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      dbName: "mydb", // 🔥 ใส่ชื่อ DB (แนะนำ)
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;