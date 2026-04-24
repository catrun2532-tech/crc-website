import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (globalThis as any)._mongoose as MongooseCache | undefined;

if (!cached) {
  cached = (globalThis as any)._mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local or on Vercel");
  }

  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    cached!.promise = null;
    throw error;
  }

  return cached!.conn;
}

export default connectDB;