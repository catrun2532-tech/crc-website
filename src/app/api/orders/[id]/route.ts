import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await Order.findById(params.id);
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updated = await Order.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}