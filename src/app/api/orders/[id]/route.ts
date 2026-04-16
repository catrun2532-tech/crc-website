import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

// GET
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  const data = await Order.findById(id);

  return NextResponse.json(data);
}

// PUT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  const body = await req.json();

  // 🔥 clean ค่า status
  if (body.status) {
    body.status = body.status.trim().toLowerCase();
  }

  // 🔥 validation กันพัง
  const allowedStatus = ["quote", "repairing", "waiting_parts", "done"];
  if (body.status && !allowedStatus.includes(body.status)) {
    return NextResponse.json(
      { error: "Invalid status value" },
      { status: 400 }
    );
  }

  try {
    const updated = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true, // 🔥 สำคัญ
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  await Order.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}