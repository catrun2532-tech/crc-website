import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

// helper: clean + validate status
function normalizeStatus(status: any) {
  if (!status) return "quote";

  const clean = String(status).trim().toLowerCase();

  const allowed = ["quote", "repairing", "waiting_parts", "done"];

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean);
  }

  return clean;
}

// schema
const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    details: { type: String },
    sn: { type: String },

    status: {
      type: String,
      enum: ["quote", "repairing", "waiting_parts", "done"], // ✅ แก้ตรงนี้
      default: "quote", // ✅ แก้ตรงนี้
    },
  },
  { timestamps: true }
);

// กัน model ซ้ำ
const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

// 👉 POST (สร้าง)
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.phone || !body.service) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const status = normalizeStatus(body.status);

    const order = await Order.create({
      name: body.name,
      phone: body.phone,
      service: body.service,
      details: body.details || "",
      sn: body.sn || "",
      status,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("❌ POST ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// 👉 GET (ทั้งหมด)
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err: any) {
    console.error("❌ GET ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}