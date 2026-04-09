export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
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