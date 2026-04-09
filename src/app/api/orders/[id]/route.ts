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

  const updated = await Order.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json(updated);
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