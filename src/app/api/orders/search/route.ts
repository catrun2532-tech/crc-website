import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { sn } = await req.json();

    if (!sn) {
      return NextResponse.json({ error: "no sn" }, { status: 400 });
    }

    const order = await Order.findOne({ sn }).lean();

    if (!order) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      name: order.name,
      phone: order.phone,
      service: order.service,
      details: order.details,
      sn: order.sn,
      status: order.status,
    });

  } catch (err) {
    console.error("❌ SEARCH ERROR:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}