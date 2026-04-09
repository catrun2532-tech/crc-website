import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// schema
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  details: String,
  sn: String,
});

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

// 👉 POST (บันทึก)
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const order = await Order.create(body);

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// 👉 GET (ดึงข้อมูล)
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ _id: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}