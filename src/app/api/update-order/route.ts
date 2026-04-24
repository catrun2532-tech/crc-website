import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  const { id, status } = await req.json();

  await connectDB();
  await Order.findByIdAndUpdate(id, { $set: { status } });

  return NextResponse.json({ success: true });
}
