import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json(null);
    }

    const order = await Order.findOne({
      $or: [{ sn: q }, { phone: q }, { name: q }],
    }).lean();

    if (!order) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: order._id?.toString(),
      name: order.name ?? "",
      phone: order.phone ?? "",
      sn: order.sn ?? "",
      service: order.service ?? "",
      details: order.details ?? "",
      ram: order.ram ?? null,
      ssd: order.ssd ?? null,
      status: order.status ?? "",
    });
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return NextResponse.json(null);
  }
}
