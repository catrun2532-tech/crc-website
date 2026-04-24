import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env or Vercel");
}

// type cache
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// ใช้ global cache (กัน reconnect ตอน dev)
const globalWithMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

const cached = globalWithMongoose._mongoose || {
  conn: null,
  promise: null,
};

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = cached;
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB error:", err);
    throw err;
  }

  return cached.conn;
}

export default connectDB;