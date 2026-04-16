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
      $or: [
        { sn: q },
        { phone: q },
        { name: q },
      ],
    }).lean(); // ✅ สำคัญ (แปลงเป็น object ธรรมดา)

    // ❌ ถ้าไม่เจอ → return null (ไม่ใช่ error)
    if (!order) {
      return NextResponse.json(null);
    }

    // ✅ ส่งเฉพาะ field ที่ใช้จริง (กัน undefined)
    return NextResponse.json({
      id: order._id,
      name: order.name || "",
      phone: order.phone || "",
      sn: order.sn || "",
      service: order.service || "",
      details: order.details || "",
      ram: order.ram || "",
      ssd: order.ssd || "",
      status: order.status || "",
    });

  } catch (err: any) {
    console.error("❌ SEARCH ERROR:", err);
    return NextResponse.json(null);
  }
}