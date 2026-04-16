import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

// helper
function normalizeStatus(status: any) {
  if (!status) return "quote";

  const clean = String(status).trim().toLowerCase();

  const allowed = ["quote", "repairing", "waiting_parts", "done"];

  if (!allowed.includes(clean)) {
    throw new Error("Invalid status: " + clean);
  }

  return clean;
}

// ✅ GET by id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const data = await Order.findById(id);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET BY ID ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ PUT update
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const body = await req.json();

    const status = normalizeStatus(body.status);

    const updated = await Order.findByIdAndUpdate(
      id,
      { ...body, status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    console.error("DELETE ERROR:", error.message);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}