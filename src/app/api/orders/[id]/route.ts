import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

const Order =
  mongoose.models.Order || mongoose.model("Order");

// 👉 GET by id (ใช้ตอนกดแก้ไข)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findById(params.id);

  return NextResponse.json(order);
}

// 👉 PUT (update)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Order.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        phone: body.phone,
        service: body.service,
        details: body.details,
        sn: body.sn,
        status: body.status,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    console.error("❌ PUT ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// 👉 DELETE (เผื่อใช้)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Order.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}