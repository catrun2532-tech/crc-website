import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// ป้องกัน build error (สำคัญใน Vercel)
export const dynamic = "force-dynamic";

// schema
const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    details: { type: String },
    sn: { type: String },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

// 👉 POST (บันทึก)
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 validate กันพัง
    if (!body.name || !body.phone || !body.service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      name: body.name,
      phone: body.phone,
      service: body.service,
      details: body.details || "",
      sn: body.sn || "",
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("❌ POST ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Server error",
      },
      { status: 500 }
    );
  }
}

// 👉 GET (ดึงข้อมูล)
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders });
  } catch (err: any) {
    console.error("❌ GET ERROR:", err);

    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}