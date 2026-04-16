import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json(
        { message: "Missing query" },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      $or: [
        { sn: q },
        { phone: q },
        { name: q },
      ],
    });

    if (!order) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("❌ SEARCH ERROR:", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}